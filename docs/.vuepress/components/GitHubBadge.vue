<template>
  <div class="github-badge-container">
    <span class="github-button-wrapper">
      <github-button :href="`${repo}/`" dataShowCount="true">Star</github-button>
    </span>
    <span class="github-button-wrapper">
      <github-button :href="`${repo}/fork`" dataShowCount="true">Fork</github-button>
    </span>
  </div>
</template>

<script>
import GithubButton from 'vue-github-button'

export default {
  components: { GithubButton },
  data() {
    return {
      repo: "https://github.com/apache/auron",
    }
  }
}
</script>

<style scoped>
.github-badge-container {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.github-button-wrapper {
  display: inline-block;
}

/* Responsive design for different screen sizes */
@media (max-width: 480px) {
  .github-badge-container {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  
  .github-button-wrapper {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .github-badge-container {
    gap: 8px;
  }
}

@media (min-width: 769px) {
  .github-badge-container {
    gap: 10px;
  }
}
</style>
