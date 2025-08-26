import{_ as e,c as l,a as n,d as i,b as r,r as p,o as t}from"./app-BGsTk-qS.js";const c={};function d(o,s){const a=p("BenchmarkChart");return t(),l("div",null,[s[0]||(s[0]=n("h1",{id:"benchmarks",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#benchmarks"},[n("span",null,"Benchmarks")])],-1)),s[1]||(s[1]=n("h2",{id:"benchmark-result",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#benchmark-result"},[n("span",null,"Benchmark Result")])],-1)),s[2]||(s[2]=n("p",null,"Here is the benchmark result of TPC-DS 1TB Dataset, running under Spark-3.5.6 and Auron-6.0.0-preview (dc8d7a9).",-1)),i(a),s[3]||(s[3]=r(`<p>Below is a brief introduction of how we run TPC-DS benchmark with Spark/Auron.</p><h2 id="generate-tpc-ds-dataset" tabindex="-1"><a class="header-anchor" href="#generate-tpc-ds-dataset"><span>Generate TPC-DS dataset</span></a></h2><p>Compile datagen tool (derived from <a href="https://github.com/maropu/spark-tpcds-datagen%5D" target="_blank" rel="noopener noreferrer">maropu/spark-tpcds-datagen</a>).</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token builtin class-name">cd</span> tpcds/datagen</span>
<span class="line">mvn package <span class="token parameter variable">-DskipTests</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Generate 1TB dataset with spark.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># use correct SPARK_HOME and output data location</span></span>
<span class="line"><span class="token comment"># --use-double-for-decimal and --use-string-for-char are optional, see dsdgen usage</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">SPARK_HOME</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/software/spark ./bin/dsdgen <span class="token punctuation">\\</span></span>
<span class="line">    --output-location /user/hive/data/tpcds-1000 <span class="token punctuation">\\</span></span>
<span class="line">    --scale-factor <span class="token number">1000</span> <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">--format</span> parquet <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">--overwrite</span> <span class="token punctuation">\\</span></span>
<span class="line">    --use-double-for-decimal <span class="token punctuation">\\</span></span>
<span class="line">    --use-string-for-char</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="run-benchmark" tabindex="-1"><a class="header-anchor" href="#run-benchmark"><span>Run benchmark</span></a></h2><p>Compile benchmark tool (derived from <a href="https://github.com/databricks/spark-sql-perf" target="_blank" rel="noopener noreferrer">databricks/spark-sql-perf</a>).</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token builtin class-name">cd</span> tpcds/benchmark-runner</span>
<span class="line">mvn package <span class="token parameter variable">-DskipTests</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>Edit your <code>$SPARK_HOME/conf/spark-default.conf</code> to enable/disable Auron (see the following conf), then launch benchmark runner. If benchmarking with Auron, ensure that the Auron jar package is correctly built and moved into <code>$SPARK_HOME/jars</code>. (<a href="https://github.com/kwai/auron/#build-from-source" target="_blank" rel="noopener noreferrer">How to build Auron?</a>)</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># use correct SPARK_HOME and data location</span></span>
<span class="line"><span class="token assign-left variable">SPARK_HOME</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/software/spark ./bin/run <span class="token punctuation">\\</span></span>
<span class="line">    --data-location /user/hive/data/tpcds-1000 <span class="token punctuation">\\</span></span>
<span class="line">    <span class="token parameter variable">--format</span> parquet <span class="token punctuation">\\</span></span>
<span class="line">    --output-dir ./benchmark-result</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Monitor benchmark status:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">tail</span> <span class="token parameter variable">-f</span> ./benchmark-result/YYYYMMDDHHmm/log</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>Summarize query times of all cases:</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">./bin/stat ./benchmark-result/YYYYMMDDHHmm</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="benchmark-configuration" tabindex="-1"><a class="header-anchor" href="#benchmark-configuration"><span>Benchmark configuration</span></a></h2><p>here is a simple configuration used for benchmarking, please notice that the benchmark result will slight differ when running on different environments.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line">spark.master <span class="token function">yarn</span></span>
<span class="line">spark.yarn.queue offline</span>
<span class="line"></span>
<span class="line">spark.eventLog.enabled <span class="token boolean">true</span></span>
<span class="line">spark.eventLog.dir hdfs:///home/spark-eventlog</span>
<span class="line">spark.history.fs.logDirectory hdfs:///home/spark-eventlog</span>
<span class="line"></span>
<span class="line">spark.shuffle.service.enabled <span class="token boolean">true</span></span>
<span class="line">spark.shuffle.service.port <span class="token number">7337</span></span>
<span class="line"></span>
<span class="line">spark.driver.memory 20g</span>
<span class="line">spark.driver.memoryOverhead <span class="token number">4096</span></span>
<span class="line"></span>
<span class="line">spark.executor.instances <span class="token number">10000</span></span>
<span class="line">spark.dynamicallocation.maxExecutors <span class="token number">10000</span></span>
<span class="line">spark.executor.cores <span class="token number">8</span></span>
<span class="line"></span>
<span class="line">spark.io.compression.codec lz4</span>
<span class="line">spark.sql.parquet.compression.codec zstd</span>
<span class="line"></span>
<span class="line"><span class="token comment"># benchmark without auron</span></span>
<span class="line"><span class="token comment">#spark.executor.memory 20g</span></span>
<span class="line"><span class="token comment">#spark.executor.memoryOverhead 4096</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># benchmark with auron</span></span>
<span class="line">spark.executor.memory 8g</span>
<span class="line">spark.executor.memoryOverhead <span class="token number">16384</span></span>
<span class="line">spark.sql.extensions org.apache.spark.sql.auron.AuronSparkSessionExtension</span>
<span class="line">spark.shuffle.manager org.apache.spark.sql.execution.auron.shuffle.AuronShuffleManager</span>
<span class="line">spark.memory.offHeap.enabled <span class="token boolean">false</span></span>
<span class="line"></span>
<span class="line">spark.auron.enable <span class="token boolean">true</span></span>
<span class="line">spark.auron.memoryFraction <span class="token number">0.8</span></span>
<span class="line">spark.auron.process.vmrss.memoryFraction <span class="token number">0.8</span></span>
<span class="line">spark.auron.tokio.worker.threads.per.cpu <span class="token number">1</span></span>
<span class="line"></span>
<span class="line">spark.auron.forceShuffledHashJoin <span class="token boolean">true</span></span>
<span class="line">spark.auron.smjfallback.enable <span class="token boolean">true</span></span>
<span class="line">spark.auron.smjfallback.mem.threshold <span class="token number">512000000</span></span>
<span class="line"></span>
<span class="line">spark.auron.udafFallback.enable <span class="token boolean">true</span></span>
<span class="line">spark.auron.partialAggSkipping.skipSpill <span class="token boolean">true</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18))])}const m=e(c,[["render",d]]),v=JSON.parse('{"path":"/documents/benchmarks.html","title":"Benchmarks","lang":"en-US","frontmatter":{"title":"Benchmarks"},"headers":[{"level":2,"title":"Benchmark Result","slug":"benchmark-result","link":"#benchmark-result","children":[]},{"level":2,"title":"Generate TPC-DS dataset","slug":"generate-tpc-ds-dataset","link":"#generate-tpc-ds-dataset","children":[]},{"level":2,"title":"Run benchmark","slug":"run-benchmark","link":"#run-benchmark","children":[]},{"level":2,"title":"Benchmark configuration","slug":"benchmark-configuration","link":"#benchmark-configuration","children":[]}],"git":{},"filePathRelative":"documents/benchmarks.md"}');export{m as comp,v as data};
