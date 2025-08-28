---
title: Getting-Started
---

# Getting Started with Auron for Apache Spark

## Build from source

To build Auron from source, follow the steps below:

1. Install Rust

Auron's native execution lib is written in Rust. You need to install Rust (nightly) before compiling.

We recommend using [rustup](https://rustup.rs/) for installation.

2. Install JDK

Auron has been well tested with JDK 8, 11, and 17.

Make sure `JAVA_HOME` is properly set and points to your desired version.

3. Check out the source code.

4. Build the project.

You can build Auron either *locally* or *inside Docker with CentOS7* using a unified script: `auron-build.sh`.

Run `./auron-build.sh --help` to see all available options.

After the build completes, a fat JAR with all dependencies will be generated in either the `target/` directory (for local builds)
or `target-docker/` directory (for Docker builds), depending on the selected build mode.

## Run Spark Job with Auron Accelerator

This section describes how to submit and configure a Spark Job with Auron support.

1. Move the Auron JAR to the Spark client classpath (normally spark-xx.xx.xx/jars/).

2. Add the following configs to spark configuration in `spark-xx.xx.xx/conf/spark-default.conf`:

```properties
spark.auron.enable true
spark.sql.extensions org.apache.spark.sql.auron.AuronSparkSessionExtension
spark.shuffle.manager org.apache.spark.sql.execution.auron.shuffle.AuronShuffleManager
spark.memory.offHeap.enabled false

# suggested executor memory configuration
spark.executor.memory 4g
spark.executor.memoryOverhead 4096
```

3. submit a query with spark-sql, or other tools like spark-thriftserver:
```shell
spark-sql -f tpcds/q01.sql
```
