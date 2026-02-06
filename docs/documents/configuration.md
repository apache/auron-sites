---
title: Configurations
---

# Configurations for Auron

### Runtime Configuration
| Conf Key | Type | Default Value | Description |
| -------- | ---- | ------------- | ----------- |
| spark.auron.enableInputBatchStatistics | Boolean | true | Enable collection of additional metrics for input batch statistics to monitor data processing performance. |
| spark.auron.enabled<br/>&nbsp;_alternative: spark.auron.enable_ | Boolean | true | Enable Spark Auron support to accelerate query execution with native implementations. |
| spark.auron.onHeapSpill.memoryFraction | Double | 0.9 | Maximum memory fraction allocated for on-heap spilling operations. This controls what portion of the available on-heap memory can be used for spilling data to disk when memory pressure occurs. |
| spark.auron.process.vmrss.memoryFraction | Double | 0.9 | Suggested fraction of process total memory (on-heap and off-heap) to use for resident memory. This controls the memory limit for the process's virtual memory resident set size (VMRSS). |
| spark.auron.shuffle.compression.targetBufSize | Integer | 4194304 | Target buffer size in bytes for shuffle compression operations. This setting controls the buffer size used during shuffle data compression, affecting both compression efficiency and memory usage. Default is 4MB (4,194,304 bytes). |
| spark.auron.spill.compression.codec | String | lz4 | Compression codec used for Spark spill operations when data is written to disk due to memory pressure. Common options include lz4, snappy, and gzip. The choice affects both spill performance and disk space usage. |
| spark.auron.suggested.batch.memSize | Integer | 8388608 | Suggested memory size in bytes for record batches. This setting controls the target memory allocation for individual data batches to optimize memory usage and processing efficiency. Default is 8MB (8,388,608 bytes). |
| spark.auron.suggested.batch.memSize.multiwayMerging | Integer | 1048576 | Suggested memory size in bytes for k-way merging operations. This uses a smaller batch memory size compared to regular operations since multiple batches are kept in memory simultaneously during k-way merging. Default is 1MB (1,048,576 bytes). |
| spark.auron.tokio.worker.threads.per.cpu | Integer | 0 | Number of Tokio worker threads to create per CPU core (spark.task.cpus). Set to 0 for automatic detection based on available CPU cores. This setting controls the thread pool size for Tokio-based asynchronous operations. |
| spark.auron.ui.enabled<br/>&nbsp;_alternative: spark.auron.ui.enable_ | Boolean | true | Enable Spark Auron UI support to display Auron-specific metrics and statistics in Spark UI. |
| spark.io.compression.codec | String | - | Compression codec used for Spark I/O operations. Common options include lz4, snappy, gzip, and zstd. The choice of codec affects both compression ratio and decompression speed. |
| spark.io.compression.zstd.level | Integer | - | Compression level for Zstandard (zstd) compression codec used in Spark I/O operations. Valid values range from 1 (fastest) to 22 (highest compression). Higher levels provide better compression but require more CPU time and memory. |
| spark.task.cpus | Integer | - | Number of CPU cores allocated per Spark task. This setting determines the parallelism level for individual tasks and affects resource allocation and task scheduling. Defaults to spark.task.cpus. |

### Operator Supports
| Conf Key | Type | Default Value | Description |
| -------- | ---- | ------------- | ----------- |
| spark.auron.enable.aggr | Boolean | true | Enable AggregateExec operation conversion to native Auron implementations. |
| spark.auron.enable.bhj | Boolean | true | Enable BroadcastHashJoinExec operation conversion to native Auron implementations. |
| spark.auron.enable.bnlj | Boolean | true | Enable BroadcastNestedLoopJoinExec operation conversion to native Auron implementations. |
| spark.auron.enable.broadcastExchange | Boolean | true | Enable BroadcastExchangeExec operation conversion to native Auron implementations. |
| spark.auron.enable.collectLimit | Boolean | true | Enable CollectLimitExec operation conversion to native Auron implementations. |
| spark.auron.enable.data.writing | Boolean | false | Enable DataWritingExec operation conversion to native Auron implementations. |
| spark.auron.enable.expand | Boolean | true | Enable ExpandExec operation conversion to native Auron implementations. |
| spark.auron.enable.filter | Boolean | true | Enable FilterExec operation conversion to native Auron implementations. |
| spark.auron.enable.generate | Boolean | true | Enable GenerateExec operation conversion to native Auron implementations. |
| spark.auron.enable.global.limit | Boolean | true | Enable GlobalLimitExec operation conversion to native Auron implementations. |
| spark.auron.enable.local.limit | Boolean | true | Enable LocalLimitExec operation conversion to native Auron implementations. |
| spark.auron.enable.local.table.scan | Boolean | true | Enable LocalTableScanExec operation conversion to native Auron implementations. |
| spark.auron.enable.paimon.scan | Boolean | true | Enable PaimonScanExec operation conversion to native Auron implementations. |
| spark.auron.enable.project | Boolean | true | Enable ProjectExec operation conversion to native Auron implementations. |
| spark.auron.enable.scan | Boolean | true | Enable ScanExec operation conversion to native Auron implementations. |
| spark.auron.enable.shj | Boolean | true | Enable ShuffledHashJoinExec operation conversion to native Auron implementations. |
| spark.auron.enable.shuffleExchange | Boolean | true | Enable ShuffleExchangeExec operation conversion to native Auron implementations. |
| spark.auron.enable.smj | Boolean | true | Enable SortMergeJoinExec operation conversion to native Auron implementations. |
| spark.auron.enable.sort | Boolean | true | Enable SortExec operation conversion to native Auron implementations. |
| spark.auron.enable.take.ordered.and.project | Boolean | true | Enable TakeOrderedAndProjectExec operation conversion to native Auron implementations. |
| spark.auron.enable.union | Boolean | true | Enable UnionExec operation conversion to native Auron implementations. |
| spark.auron.enable.window | Boolean | true | Enable WindowExec operation conversion to native Auron implementations. |
| spark.auron.enable.window.group.limit | Boolean | true | Enable WindowGroupLimitExec operation conversion to native Auron implementations. |
| spark.auron.forceShuffledHashJoin | Boolean | false | Force replacement of all sort-merge joins with shuffled-hash joins for performance comparison and benchmarking. This setting is primarily used for testing and performance analysis, as different join strategies may be optimal for different data distributions and query patterns. |
| spark.auron.smjfallback.enable | Boolean | false | Enable fallback from hash join to sort-merge join when the hash table becomes too large to fit in memory. This prevents out-of-memory errors by switching to a more memory-efficient join strategy when necessary. |
| spark.auron.smjfallback.mem.threshold | Integer | 134217728 | Memory size threshold in bytes that triggers fallback from hash join to sort-merge join. When the hash table memory usage exceeds this threshold (128MB by default), the system switches to sort-merge join to prevent memory overflow. |
| spark.auron.smjfallback.rows.threshold | Integer | 10000000 | Row count threshold that triggers fallback from hash join to sort-merge join. When the number of rows in the hash table exceeds this threshold, the system will switch to sort-merge join to avoid memory issues. |

### Data Sources
| Conf Key | Type | Default Value | Description |
| -------- | ---- | ------------- | ----------- |
| spark.auron.enable.scan.orc | Boolean | true | Enable OrcScanExec operation conversion to native Auron implementations. |
| spark.auron.enable.scan.orc.timestamp | Boolean | true | Enable OrcScanExec operation conversion with timestamp fields to native Auron implementations. |
| spark.auron.enable.scan.parquet | Boolean | true | Enable ParquetScanExec operation conversion to native Auron implementations. |
| spark.auron.enable.scan.parquet.timestamp | Boolean | true | Enable ParquetScanExec operation conversion with timestamp fields to native Auron implementations. |
| spark.auron.files.ignoreCorruptFiles | Boolean | - | Ignore corrupted input files, defaults to spark.sql.files.ignoreCorruptFiles |
| spark.auron.orc.force.positional.evolution | Boolean | false | Force ORC positional evolution mode for schema evolution operations. When enabled, column mapping will be based on column position rather than column name, which can be useful for certain schema evolution scenarios. |
| spark.auron.orc.schema.caseSensitive.enable | Boolean | false | Enable case-sensitive schema matching for ORC files. When true, column names in the schema must match the case of columns in the ORC file exactly. When false, column name matching is case-insensitive. |
| spark.auron.orc.timestamp.use.microsecond | Boolean | false | Use microsecond precision when reading ORC timestamp columns instead of the default millisecond precision. This provides higher temporal resolution for timestamp data but may require more storage space. |
| spark.auron.parquet.enable.bloomFilter | Boolean | false | Enable Parquet bloom filter support for efficient equality predicate filtering. Bloom filters can quickly determine if a value might exist in a data block, reducing unnecessary I/O operations. |
| spark.auron.parquet.enable.pageFiltering | Boolean | false | Enable Parquet page-level filtering to skip reading unnecessary data pages during query execution. This optimization can significantly improve read performance by avoiding I/O for pages that don't match filter predicates. |
| spark.auron.parquet.maxOverReadSize | Integer | 16384 | Maximum over-read size in bytes for Parquet file operations. This controls how much extra data can be read beyond the required data to optimize I/O operations and improve read performance. |
| spark.auron.parquet.metadataCacheSize | Integer | 5 | Size of the Parquet metadata cache in number of entries. This cache stores file metadata to avoid repeated metadata reads and improve query performance for frequently accessed files. |

### Expression/Function Supports
| Conf Key | Type | Default Value | Description |
| -------- | ---- | ------------- | ----------- |
| spark.auron.cast.trimString | Boolean | true | Enable automatic trimming of whitespace from string inputs before casting to numeric or boolean types. This helps prevent casting errors due to leading/trailing whitespace. |
| spark.auron.datetime.extract.enabled | Boolean | false | Enable datetime extract operations conversion to native Auron implementations. |
| spark.auron.decimal.arithOp.enabled | Boolean | false | Enable decimal arithmetic operations conversion to native Auron implementations. |
| spark.auron.enable.caseconvert.functions | Boolean | true | Enable converting UPPER/LOWER string functions to native implementations for better performance. Note: May produce different outputs from Spark in special cases due to different Unicode versions. |
| spark.auron.forceShortCircuitAndOr | Boolean | false | Force the use of short-circuit evaluation (PhysicalSCAndExprNode/PhysicalSCOrExprNode) for AND/OR expressions, regardless of whether the right-hand side contains Hive UDFs. This can improve performance by avoiding unnecessary evaluation of expressions when the result is already determined. |
| spark.auron.parseJsonError.fallback | Boolean | true | Enable fallback to UDFJson implementation when native JSON parsing encounters errors. This ensures query execution continues even when the native JSON parser fails, at the cost of potentially slower performance. |
| spark.auron.udf.UDFJson.enabled | Boolean | true | Enable UDFJson function conversion to native Auron implementations. |
| spark.auron.udf.brickhouse.enabled | Boolean | true | Enable Brickhouse UDF conversion to native Auron implementations. |
| spark.auron.udf.singleChildFallback.enabled | Boolean | true | Enable falling-back UDF/expression with single child. |

### UDAF Fallback
| Conf Key | Type | Default Value | Description |
| -------- | ---- | ------------- | ----------- |
| spark.auron.suggested.udaf.memUsedSize | Integer | 64 | Suggested memory usage size per row for TypedImperativeAggregate functions in bytes. This helps in memory allocation planning for UDAF operations. |
| spark.auron.udafFallback.enable | Boolean | true | Enable fallback support for UDAF and other aggregate functions that are not implemented in Auron, allowing them to be executed using Spark's native implementation. |
| spark.auron.udafFallback.num.udafs.trigger.sortAgg | Integer | 1 | Number of UDAFs to trigger sort-based aggregation, by default, all aggs containing udafs are converted to sort-based. |
| spark.auron.udafFallback.typedImperativeEstimatedRowSize | Integer | 256 | Estimated memory size per row for TypedImperativeAggregate functions in bytes. This estimation is used for memory planning and allocation during UDAF fallback operations. |

### Partial Aggregate Skipping
| Conf Key | Type | Default Value | Description |
| -------- | ---- | ------------- | ----------- |
| spark.auron.partialAggSkipping.enable | Boolean | true | Enable partial aggregate skipping optimization to improve performance by skipping unnecessary partial aggregation stages when certain conditions are met. See issue #327 for detailed implementation. |
| spark.auron.partialAggSkipping.minRows | Integer | - | Minimum number of rows required to trigger partial aggregate skipping optimization. This prevents the optimization from being applied to very small datasets where it may not be beneficial. Defaults to spark.auron.batchSize * 5 |
| spark.auron.partialAggSkipping.ratio | Double | 0.9 | Threshold ratio for partial aggregate skipping optimization. When the ratio of unique keys to total rows exceeds this value, partial aggregation may be skipped to improve performance. |
| spark.auron.partialAggSkipping.skipSpill | Boolean | false | Always skip partial aggregation when spilling is triggered to prevent memory pressure. When enabled, the system will bypass partial aggregation stages if memory spilling occurs, potentially trading off some optimization for memory stability. |

