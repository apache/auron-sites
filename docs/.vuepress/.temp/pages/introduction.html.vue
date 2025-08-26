<template><div><h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview"><span>Overview</span></a></h2>
<p>The <a href="https://github.com/kwai/auron" target="_blank" rel="noopener noreferrer">Auron</a> accelerator for Apache Spark leverages native vectorized execution to accelerate query processing. It combines the power of the Apache Arrow-DataFusion library and the scale of the Spark distributed computing framework.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction"><span>Introduction</span></a></h2>
<h3 id="problem-statement" tabindex="-1"><a class="header-anchor" href="#problem-statement"><span>Problem Statement</span></a></h3>
<p>Apache Spark is a popular distributed computing framework for handling large-scale data processing tasks. However, as the data size increases, traditional row-based processing can lead to significant CPU latencies and become a performance bottleneck. To overcome this challenge, vectorized execution technology has been introduced as an optimization method for Spark.</p>
<h3 id="auron-s-solution" tabindex="-1"><a class="header-anchor" href="#auron-s-solution"><span>Auron’s Solution</span></a></h3>
<p>Vectorized execution technology operates by processing data in batches rather than rows, reducing function calls and improving computation performance with SIMD instructions. Auron leverages this technology by integrating the Apache Arrow-DataFusion library with the Spark framework.</p>
<p>Auron checks and translates supported operators in the Spark's physical plan and generates an equivalent native execution plan, then it passes the generated execution plan to the underlying native engine through JNI calls. The native engine executes the plan with DataFusion framework, which benefits from vectorized execution and has better performance comparing to Spark's JVM based execution.</p>
<h3 id="target-user" tabindex="-1"><a class="header-anchor" href="#target-user"><span>Target User</span></a></h3>
<p>Auron's target users are those who want to accelerate Spark SQL/DataFrame queries. Users can install Auron as a Spark client extension. After installing, most SQL queries should run faster without modifying, and save cluster resources.</p>
<h2 id="architecture" tabindex="-1"><a class="header-anchor" href="#architecture"><span>Architecture</span></a></h2>
<p>The architecture design of Auron is as follows.
Auron takes a fully optimized physical plan from Spark, mapping it into equivalent execution plan implemented in native engine, and executes in Spark distributed environment.</p>
<p><img src="@source/img/auron_architecture.webp" alt="Spark+Auron architecture"></p>
<p>Auron is composed of the following high-level components:</p>
<ul>
<li><strong>Spark Extension</strong>: hooks the whole accelerator into Spark execution lifetime.</li>
<li><strong>Spark Shims</strong>: specialized codes for different versions of spark.</li>
<li><strong>Native Engine</strong>: implements the native engine in rust, including:
<ul>
<li>ExecutionPlan protobuf specification.</li>
<li>JNI gateway.</li>
<li>Customized operators, expressions, functions with DataFusion framework</li>
<li>Other common mods like memory management, fallback framework, HDFS-integrating, etc.</li>
</ul>
</li>
</ul>
<p>The architecture diagram of the <strong>native engine</strong> is as follows:</p>
<p><img src="@source/img/auron_native_engine.webp" alt="Auron Native Engine"></p>
<h3 id="currently-supported-native-operators-expressions" tabindex="-1"><a class="header-anchor" href="#currently-supported-native-operators-expressions"><span>Currently Supported Native Operators/Expressions</span></a></h3>
<p>All supported operators in Auron are listed below. Auron does support fallbacking an operator to spark execution which has not been implemented, so SQLs containing unsupported operators can still be executed successfully. However, fallbacks takes extra costs, too many fallbacks will slow down the execution.</p>
<p>Most spark builtin expressions are supported in Auron (by translating to DataFusion-physical-exprs). Auron also supports expression-level fallbacking, which can fallback a single unsupported expression to spark execution. so SQLs containing some unsupported expressions like UDF/UDTFs can still be optimized.</p>
<table class="my-table3">
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
    <td>Range partitioning is not supported at the moment.</td>
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
    <td>Only the default range [unboundedPreceding, currentRow] is supported.</td>
  </tr>
  <tr>
    <td>NativeExpand</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeGenerate</td>
    <td></td>
  </tr>
  <tr>
    <td>NativeHashAggregate</td>
    <td rowspan="2">UDAF is not supported at the moment.</td>
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
</table>
<h2 id="join-the-community" tabindex="-1"><a class="header-anchor" href="#join-the-community"><span>Join the Community</span></a></h2>
<h3 id="source-code" tabindex="-1"><a class="header-anchor" href="#source-code"><span>Source Code</span></a></h3>
<p>Please see <a href="https://github.com/kwai/auron" target="_blank" rel="noopener noreferrer">Auron source code</a> for more information.</p>
<h3 id="community" tabindex="-1"><a class="header-anchor" href="#community"><span>Community</span></a></h3>
<p>We're using <a href="https://github.com/kwai/auron/discussions" target="_blank" rel="noopener noreferrer">Discussions</a> to connect with other members of our community. We hope that you:</p>
<ul>
<li>Ask questions you're wondering about.</li>
<li>Share ideas.</li>
<li>Engage with other community members.</li>
<li>Welcome others who are open-minded. Remember that this is a community we build together 💪 .</li>
</ul>
<h3 id="wechat-group" tabindex="-1"><a class="header-anchor" href="#wechat-group"><span>WeChat Group</span></a></h3>
<p>We've set up a WeChat group to help Chinese developers communicate more effectively. If you'd like to join, please email us at auron@kwai.com.</p>
<h2 id="performance" tabindex="-1"><a class="header-anchor" href="#performance"><span>Performance</span></a></h2>
<p>Check <a href="https://github.com/kwai/auron/blob/v4.0.0/benchmark-results/20240701-auron300.md" target="_blank" rel="noopener noreferrer">Benchmark Results</a> with the latest date for the performance comparison with vanilla Spark 3.3.3. The benchmark result shows that Auron save about 50% time on TPC-DS/TPC-H 1TB datasets. Stay tuned and join us for more upcoming thrilling numbers.</p>
<p><img src="@source/img/Auron-TPC-DS-1TB-Benchmark.png" alt="Auron-TPC-DS-1TB-Benchmark"></p>
<h2 id="thanks-to-our-contributors" tabindex="-1"><a class="header-anchor" href="#thanks-to-our-contributors"><span>Thanks to our contributors</span></a></h2>
<br>
<a href="https://github.com/kwai/auron/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=kwai/auron" />
</a>
</div></template>


