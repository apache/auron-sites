---
title: Getting-Started
---

# Getting Started with Apache Auron (Incubating) for Apache Spark

## Build from source

To build Apache Auron (Incubating) from source, follow the steps below:

1. Install Rust

Apache Auron (Incubating)'s native execution lib is written in Rust. You need to install Rust (nightly) before compiling.

We recommend using [rustup](https://rustup.rs/) for installation.

2. Install JDK

Apache Auron (Incubating) has been well tested with JDK 8, 11, and 17.

Make sure `JAVA_HOME` is properly set and points to your desired version.

3. Check out the source code.

4. Build the project.

You can build Apache Auron (Incubating) either *locally* or *inside Docker* using one of the supported OS images via the unified script: `auron-build.sh`.

Run `./auron-build.sh --help` to see all available options.

After the build completes, a fat JAR with all dependencies will be generated in either the `target/` directory (for local builds)
or `target-docker/` directory (for Docker builds), depending on the selected build mode.

## Run Apache Spark Job with Apache Auron (Incubating) Accelerator

This section describes how to submit and configure an Apache Spark Job with Apache Auron (Incubating) support.

1. Move the Apache Auron (Incubating) JAR to the Apache Spark client classpath (normally spark-xx.xx.xx/jars/).

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
## Integrating Apache Auron (Incubating) with Remote Shuffle Services (RSS)

Apache Auron (Incubating) can be integrated with external Remote Shuffle Services to enhance shuffle performance and improve scalability.

Currently, `Apache Celeborn` and `Apache Uniffle` are supported. Please run `./auron-build.sh --help` for the up-to-date supported versions.

### Apache Celeborn

Apache Auron (Incubating) can work with Celeborn as a shuffle manager. Integration involves configuring Apache Auron (Incubating)/Apache Spark to use the AuronCelebornShuffleManager and pointing it to the appropriate Celeborn master endpoints and storage locations. This allows Apache Spark jobs running on Apache Auron (Incubating) to leverage Celeborn for distributed shuffling.

You can integrate using the following example configuration:

```properties
spark.shuffle.manager org.apache.spark.sql.execution.auron.shuffle.celeborn.AuronCelebornShuffleManager
spark.serializer org.apache.spark.serializer.KryoSerializer
spark.celeborn.master.endpoints localhost:9097
spark.celeborn.client.spark.shuffle.writer hash
spark.sql.adaptive.localShuffleReader.enabled false
```

### Apache Uniffle

Similarly, Apache Auron (Incubating) also supports Uniffle, you need to configure Apache Auron (Incubating)/Apache Spark to use the AuronUniffleShuffleManager and specify the Uniffle coordinator endpoints.

You can integrate using the following example configuration:

```properties
spark.shuffle.manager org.apache.spark.sql.execution.auron.shuffle.uniffle.AuronUniffleShuffleManager
spark.serializer org.apache.spark.serializer.KryoSerializer
spark.rss.coordinator.quorum <coordinatorIp1>:19999,<coordinatorIp2>:19999
spark.rss.enabled true
```

### Notes
1. Ensure the relevant RSS client JARs are included in your Apache Spark application's classpath.

2. Replace endpoints and directories with the actual addresses in your cluster.

3. For detailed setup and advanced configuration, refer to the official documentation for the respective:
   * [Celeborn](https://celeborn.apache.org/docs/latest/)
   * [Uniffle](https://uniffle.apache.org/docs/client-guide)
