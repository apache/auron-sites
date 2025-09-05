---
title: Benchmarks
---

# Benchmarks

## Benchmark Result

Here is the benchmark result of TPC-DS 1TB Dataset, running under Spark-3.5.6 and Auron-6.0.0-preview (dc8d7a9).

<BenchmarkChart />

Below is a brief introduction of how we run TPC-DS benchmark with Spark/Auron.

## Get TPC-DS tools
```
git clone https://github.com/auron-project/tpcds-tools
```

## Generate TPC-DS dataset

Compile datagen tool (derived from [maropu/spark-tpcds-datagen](https://github.com/maropu/spark-tpcds-datagen])).
```bash
cd tpcds/datagen
mvn package -DskipTests
```

Generate 1TB dataset with spark.
```bash
# use correct SPARK_HOME and output data location
# --use-double-for-decimal and --use-string-for-char are optional, see dsdgen usage

SPARK_HOME=$HOME/software/spark ./bin/dsdgen \
    --output-location /user/hive/data/tpcds-1000 \
    --scale-factor 1000 \
    --format parquet \
    --overwrite \
    --use-double-for-decimal \
    --use-string-for-char
```

## Run benchmark

Compile benchmark tool (derived from [databricks/spark-sql-perf](https://github.com/databricks/spark-sql-perf)).
```bash
cd tpcds/benchmark-runner
mvn package -DskipTests
```

Edit your `$SPARK_HOME/conf/spark-default.conf` to enable/disable Auron (see the following conf), then launch benchmark runner.
If benchmarking with Auron, ensure that the Auron jar package is correctly built and moved into `$SPARK_HOME/jars`. ([How to build Auron?](https://github.com/apache/auron/#build-from-source))
```bash
# use correct SPARK_HOME and data location
SPARK_HOME=$HOME/software/spark ./bin/run \
    --data-location /user/hive/data/tpcds-1000 \
    --format parquet \
    --output-dir ./benchmark-result
```

Monitor benchmark status:
```bash
tail -f ./benchmark-result/YYYYMMDDHHmm/log
```

Summarize query times of all cases:
```bash
./bin/stat ./benchmark-result/YYYYMMDDHHmm
```

## Benchmark configuration

here is a simple configuration used for benchmarking, please notice that the benchmark result will slight differ when running on different environments.

```sh
spark.master yarn
spark.yarn.queue offline

spark.eventLog.enabled true
spark.eventLog.dir hdfs:///home/spark-eventlog
spark.history.fs.logDirectory hdfs:///home/spark-eventlog

spark.shuffle.service.enabled true
spark.shuffle.service.port 7337

spark.driver.memory 20g
spark.driver.memoryOverhead 4096

spark.executor.instances 10000
spark.dynamicallocation.maxExecutors 10000
spark.executor.cores 8

spark.io.compression.codec lz4
spark.sql.parquet.compression.codec zstd

# benchmark without auron
#spark.executor.memory 20g
#spark.executor.memoryOverhead 4096

# benchmark with auron
spark.executor.memory 8g
spark.executor.memoryOverhead 16384
spark.sql.extensions org.apache.spark.sql.auron.AuronSparkSessionExtension
spark.shuffle.manager org.apache.spark.sql.execution.auron.shuffle.AuronShuffleManager
spark.memory.offHeap.enabled false

spark.auron.enable true
spark.auron.memoryFraction 0.8
spark.auron.process.vmrss.memoryFraction 0.8
spark.auron.tokio.worker.threads.per.cpu 1

spark.auron.forceShuffledHashJoin true
spark.auron.smjfallback.enable true
spark.auron.smjfallback.mem.threshold 512000000

spark.auron.udafFallback.enable true
spark.auron.partialAggSkipping.skipSpill true
```
