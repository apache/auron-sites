<template>
  <div class="home-banner">
    <div class="banner-title-container">
      <div class="banner-title">Run Spark SQL/DataFrame Faster</div>
      <div class="banner-subtitle">The Auron accelerator for big data engine (e.g., Spark, Flink) leverages native vectorized execution to accelerate query processing.</div>
      <div class="github-buttons-container"><GitHubBadge /></div>
      <a class="route-link auto-link vp-hero-action-button primary" href="/documents/getting-started" aria-label="Get Started">Get Started</a>
    </div>
    <div class="right-logo-container">
      <div class="right-logo">
        <img src="/logo-mini.png" />
      </div>
    </div>
  </div>

  <div class="home-para">
    <div class="para-title">Key Features</div>
    <div class="feature-container-wrapper">
      <div class="feature-container">
        <div class="feature-title">
          <img src="/performance_icon.png" alt="Performance Icon"/>
          Performance
        </div>
        <ul class="feature-details">
          <li>Supports most native operators/expressions and fine-grained failback.</li>
          <li>Powered by Rust,  <strong class="bold-text">2x faster</strong> on TPC-DS benchmark.</li>
          <li>Performs significantly better in production environments.</li>
        </ul>
      </div>
      <div class="feature-container">
        <div class="feature-title">
          <img src="/ready_icon.png" alt="Production ready Icon"/>
          Production ready
        </div>
        <ul class="feature-details">
          <li>Verified on production environments with exabytes of data.</li>
          <li>Supports complex production scenarios like JSON parsing, UDF/UDTF, etc.</li>
          <li>Resolved various stability and data consistency issues.</li>
        </ul>
      </div>
      <div class="feature-container">
        <div class="feature-title">
          <img src="/use_icon.png" alt="Easy to Use Icon"/>
          Easy to Use
        </div>
        <ul class="feature-details">
          <li>Simple to build and install to Spark.</li>
          <li>Easy to configuration.</li>
          <li>Full-featured execution metrics.</li>
        </ul>
      </div>
      <div class="feature-container">
        <div class="feature-title">
          <img src="/compatibility_icon.png" alt="Compatibility Icon"/>
          Compatibility
        </div>
        <ul class="feature-details">
          <li>Adapted to Spark mainline versions.</li>
          <li>Supports different storage systems like HDFS, S3, etc.</li>
        </ul>
      </div>
      <div class="feature-container">
        <div class="feature-title">
          <img src="/ecology_icon.png" alt="Ecology Icon"/>
          Ecosystem
        </div>
        <ul class="feature-details">
          <li>Supports data lake system like Hudi, Paimon.</li>
          <li>Supports Remote Shuffle Service like Apache Celeborn.</li>
        </ul>
      </div>
      <div class="feature-container">
        <div class="feature-title">
          <img src="/development_icon.png" alt="Development Icon"/>
          Community
        </div>
        <ul class="feature-details">
          <li>Some cooperators have applied Auron on production.</li>
          <li>More are researching and evaluating Auron.</li>
        </ul>
      </div>
    </div>
  </div>
  <hr/>
</template>

<script setup>
</script>

<style scoped>
</style>
