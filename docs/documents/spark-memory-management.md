---
title: Spark Memory Management
---

# Spark Memory Management

## Memory management overview

Auron's native execution runs inside the Spark executor's JVM process. Its working data, such as Arrow batches, sort keys, and aggregation tables, lives outside the JVM heap in the same process.

Auron has its own memory manager for this native state. When it triggers spilling, an operator can keep its serialized data in available JVM heap memory or write it to local disk. Spark manages the heap-backed spill buffers. Auron manages the native working state.

[![The diagram shows container and JVM memory scopes with configuration braces. Green highlights identify Auron heap spill buffers and native allocations. The optional Spark-managed off-heap pool is separate. These are conceptual scopes, not fixed physical partitions.](/memory-layout.svg)](/memory-layout.svg)

## How spilling works

When the native manager triggers a spill, the operator can use available Spark heap memory to avoid immediate disk I/O. If heap storage is ineligible or a write cannot acquire enough memory, it uses a local file. Heap-backed spills can also move to disk later.

Remote shuffle instead hands buffered output to a service client, such as Celeborn or Uniffle, which may buffer it before sending.

[![Spill-storage decisions for executor tasks: both Spark execution-pool and JVM committed-heap usage must be below the configured threshold, 90% by default. Each write must then receive a full memory grant. Otherwise use disk. Existing heap buffers can also move to disk later.](/memory-spilling.svg)](/memory-spilling.svg)

### 1. Is heap storage eligible?

For executor tasks, heap storage requires both usage ratios below `spark.auron.onHeapSpill.memoryFraction` (90% by default):

| Check | Usage ratio |
| --- | --- |
| Spark on-heap execution pool | Used execution memory / total execution-pool capacity |
| JVM heap | Used heap / currently committed heap |

The JVM check uses currently committed heap, not maximum heap. If either check fails, use disk.

### 2. Does Spark grant enough memory for the write?

Each write requests on-heap execution memory from Spark. A full grant keeps the serialized bytes in heap buffers. A partial or refused grant switches the spill to a local file, returning any partial grant.

### 3. What happens under later heap pressure?

Auron can move an existing heap-backed spill to disk when a later write cannot acquire its full memory grant, or when Spark asks Auron's heap spill manager to release execution memory.

When it switches, Auron writes the buffered spill data to a file in Spark's local block directories and returns its accounted heap memory to Spark. Subsequent writes to that spill use the file. The data is preserved on disk rather than discarded.

## Native memory budget and bookkeeping

Auron initializes one native memory manager per process, shared across tasks. Its native memory target is approximately:

```text
native target = spark.executor.memoryOverhead * spark.auron.memoryFraction
```

Auron calls a component that reports its memory usage a memory consumer. Examples include sorters and aggregation tables. A task can have several consumers.

Consumers explicitly report usage at processing steps, such as after an input batch, after spilling, or during merge/output. Some also report projected usage before buffering data. Each report updates that consumer's recorded usage and the manager's total. Consumers also declare whether they can currently spill. The manager does not infer usage or spillability from allocations.

The manager divides the remaining budget among spillable consumers:

```text
available = max(native target - allocated JVM buffer size - unspillable usage, 0)
consumer share = available / number of spillable consumers
```

Allocated JVM buffer size is the combined capacity of existing JVM buffers, not free space. Reported unspillable state still counts toward usage but cannot be selected for an ordinary pressure-triggered spill. Dropping a consumer removes its reported usage.

Adding a spillable consumer reduces the shares without immediately reclaiming memory. An existing consumer can stay above its new share until its next qualifying growth report or a forced spill.

During the same growth report, the manager checks three pressure signals. The reporting consumer can exceed its share, total reported usage can exceed the available amount, or Linux process resident memory can exceed:

```text
process-RSS threshold =
    (spark.executor.memory + executor memory overhead)
    * spark.auron.process.vmrss.memoryFraction
```

Any of these signals can trigger action on the reporting consumer, which may spill or briefly wait. The manager does not scan for another consumer to spill. RSS includes JVM heap and allocations outside native bookkeeping, so it can trigger a consumer below its share.

### Spark's off-heap pool is separate

`spark.memory.offHeap.size` does not enlarge Auron's native budget or provide another spill destination. Auron's Spark spill-buffer consumer always uses `MemoryMode.ON_HEAP`, even with Spark off-heap enabled.

Spark off-heap allocations still contribute to process RSS without raising Auron's threshold. Spark can request a larger container for that pool, but Auron's threshold remains based on heap plus overhead, so it may spill despite remaining container headroom. The Auron setup recommends `spark.memory.offHeap.enabled=false`.

## Configuration

| Setting | Default | Role |
| --- | --- | --- |
| `spark.auron.memoryFraction` | `0.6` | Multiplier used to initialize the process-wide native target. Lowering the native fraction encourages earlier spilling. |
| `spark.auron.process.vmrss.memoryFraction` | `0.9` | Process-RSS spill threshold fraction of configured heap plus overhead. |
| `spark.auron.onHeapSpill.memoryFraction` | `0.9` | Usage-ratio threshold for allowing a new heap-backed spill. Lowering the heap-spill threshold routes more new spills to disk. |
| `spark.auron.batchSize` | `10000` rows | Suggested row count per batch. Memory-aware output sizing can choose fewer rows based on `spark.auron.suggested.batch.memSize`, especially for wider rows. |
| `spark.auron.suggested.batch.memSize` | `8388608` bytes (8 MiB) | Suggested memory size per batch. Output sizing estimates how many rows fit this target. Coalescing can emit a batch when either this target or the row target is reached. These are suggestions, not strict limits. |
| `spark.auron.spill.compression.codec` | `lz4` | Codec for the compressed spill interface. |
