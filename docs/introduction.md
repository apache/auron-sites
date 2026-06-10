---
title: Introduction
---

## Overview
The [Apache Auron (Incubating)](https://github.com/apache/auron) accelerator for Apache Spark leverages native vectorized execution to accelerate query processing. It combines the power of the Apache Arrow-DataFusion library and the scale of the Spark distributed computing framework.


## Introduction

### Problem Statement
Apache Spark is a popular distributed computing framework for handling large-scale data processing tasks. However, as the data size increases, traditional row-based processing can lead to significant CPU latencies and become a performance bottleneck. To overcome this challenge, vectorized execution technology has been introduced as an optimization method for Spark. 

### Apache Auron (Incubating)’s Solution
Vectorized execution technology operates by processing data in batches rather than rows, reducing function calls and improving computation performance with SIMD instructions. Apache Auron (Incubating) leverages this technology by integrating the Apache Arrow-DataFusion library with the Spark framework.

Apache Auron (Incubating) checks and translates supported operators in the Spark’s physical plan and generates an equivalent native execution plan, then it passes the generated execution plan to the underlying native engine through JNI calls. The native engine executes the plan with DataFusion framework, which benefits from vectorized execution and has better performance comparing to Spark’s JVM based execution.

### Target User
Apache Auron (Incubating)’s target users are those who want to accelerate Spark SQL/DataFrame queries. Users can install Apache Auron (Incubating) as a Spark client extension. After installing, most SQL queries should run faster without modifying, and save cluster resources.

## Architecture
The architecture design of Apache Auron (Incubating) is as follows.
Apache Auron (Incubating) takes a fully optimized physical plan from Spark, mapping it into equivalent execution plan implemented in native engine, and executes in Spark distributed environment.

![Apache Spark + Apache Auron (Incubating) architecture](./img/auron_architecture.webp)

Apache Auron (Incubating) is composed of the following high-level components:

- **Spark Extension**: hooks the whole accelerator into Spark execution lifetime.
- **Spark Shims**: specialized codes for different versions of Spark.
- **Native Engine**: implements the native engine in rust, including:
  - ExecutionPlan protobuf specification.
  - JNI gateway.
  - Customized operators, expressions, functions with DataFusion framework
  - Other common mods like memory management, fallback framework, HDFS-integrating, etc.

The architecture diagram of the **native engine** is as follows:

![Apache Auron (Incubating) Native Engine](./img/auron_native_engine.webp)

### Currently Supported Native Operators/Expressions

All supported operators in Apache Auron (Incubating) are listed below. Apache Auron (Incubating) does support fallbacking an operator to Spark execution which has not been implemented, so SQLs containing unsupported operators can still be executed successfully. However, fallbacks takes extra costs, too many fallbacks will slow down the execution.

Most Spark builtin expressions are supported in Apache Auron (Incubating) (by translating to DataFusion-physical-exprs). Apache Auron (Incubating) also supports expression-level fallbacking, which can fallback a single unsupported expression to Spark execution. so SQLs containing some unsupported expressions like UDF/UDTFs can still be optimized.

<table class="my-table3">
  <tbody>
  <tr>
    <th>Native Operator</th>
    <th>Note</th>
  </tr>
  <tr>
    <td>NativeParquetScan</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeParquetInsert</td>
    <td>Some versions of Spark have not been tested. This parameter is disabled by default.</td>
  </tr>
  <tr>
    <td>NativeOrcScan</td>
    <td>The feature is not fully developed and does not support stripe clipping.</td>
  </tr>
  <tr>
    <td>NativeShuffleExchange</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeBroadcastExchange</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeProject</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeFilter</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeSort</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeLocalLimit</td>
    <td></td>
  </tr>
   <tr>
    <td>NativeGlobalLimit</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeTakeOrdered</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeUnion</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeWindow</td>
    <td rowspan="2">Only the default range [unboundedPreceding, currentRow] is supported.</td>
  </tr>
  <tr>
    <td>NativeWindowGroupLimit</td>
  </tr>
  <tr>
    <td>NativeExpand</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeGenerate</td>
    <td>Supports user-specified table function (UDTF)</td>
  </tr>
  <tr>
    <td>NativeHashAggregate</td>
    <td rowspan="2">Supports user-specified aggregate function (UDAF)</td>
  </tr>
  <tr>
    <td>NativeSortAggregate</td>
  </tr>
  <tr>
    <td>NativeBroadcastJoin</td>
    <td rowspan="4">Non-equi joins are not supported at the moment.</td> 
  </tr>
  <tr>
    <td>NativeShuffledHashJoin</td>
  </tr>
  <tr>
    <td>NativeSortMergeJoin</td>
  </tr>
  <tr>
    <td>NativeBroadcastNestedLoopJoin</td>
  </tr>
  </tbody>
</table>

## Join the Community

### Source Code
Please see [Apache Auron (Incubating) source code](https://github.com/apache/auron) for more information.

### Cooperators

Apache Auron (Incubating) currently has some users and contributors:

<div class="partners-container">
  <div class="partners">
    <div class="partner-logo"><img src="./img/logo/kwai.png" /></div>
    <div class="partner-logo"><img src="./img/logo/didiglobal.webp" /></div>
    <div class="partner-logo"><img src="./img/logo/bilibili.png" /></div>
    <div class="partner-logo"><img src="./img/logo/xiecheng.png" /></div>
    <div class="partner-logo"><img src="./img/logo/car.png" /></div>
    <div class="partner-logo"><img src="./img/logo/58com.png" /></div>
    <div class="partner-logo"><img src="./img/logo/jjworld.png" /></div>
    <div class="partner-logo"><img src="./img/logo/tcl.png" /></div>
    <div class="partner-logo"><img src="./img/logo/yy.png" /></div>
    <div class="partner-logo"><img src="./img/logo/dmall.png" /></div>
    <div class="partner-logo"><img src="./img/logo/intsig.png" /></div>
    <div class="partner-logo"><img src="./img/logo/wanfang.png" /></div>
    <div class="partner-logo"><img src="./img/logo/brd.png" /></div>
    <div class="partner-logo"><img src="./img/logo/huaxia.png" /></div>
    <div class="partner-logo"><img src="./img/logo/ssc.png" /></div>
    <div class="partner-logo"><img src="./img/logo/hair.png" /></div>
    <div class="partner-logo"><img src="./img/logo/dazhen.jpg" /></div>
    <div class="partner-logo"><img src="./img/logo/lbxdyf.jpg" /></div>
  </div>
</div>

### Subscribe Mailing Lists

Mail List is the most recognized form of communication in the Apache community.
Contact us through the following mailing list.

| Name                                                       | Scope                           |                                                          |                                                               | 
|:-----------------------------------------------------------|:--------------------------------|:---------------------------------------------------------|:--------------------------------------------------------------|
| [dev@auron.apache.org](mailto:dev@auron.apache.org)  | Development-related discussions | [Subscribe](mailto:dev-subscribe@auron.apache.org)    | [Unsubscribe](mailto:dev-unsubscribe@auron.apache.org)     |


### Report Issues or Submit Pull Request

If you meet any questions, connect us and fix it by submitting a 🔗[Pull Request](https://github.com/apache/auron/pulls).

