import comp from "/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/documents/benchmarks.html.vue"
const data = JSON.parse("{\"path\":\"/documents/benchmarks.html\",\"title\":\"Benchmarks\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Benchmarks\"},\"headers\":[{\"level\":2,\"title\":\"Benchmark Result\",\"slug\":\"benchmark-result\",\"link\":\"#benchmark-result\",\"children\":[]},{\"level\":2,\"title\":\"Generate TPC-DS dataset\",\"slug\":\"generate-tpc-ds-dataset\",\"link\":\"#generate-tpc-ds-dataset\",\"children\":[]},{\"level\":2,\"title\":\"Run benchmark\",\"slug\":\"run-benchmark\",\"link\":\"#run-benchmark\",\"children\":[]},{\"level\":2,\"title\":\"Benchmark configuration\",\"slug\":\"benchmark-configuration\",\"link\":\"#benchmark-configuration\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"documents/benchmarks.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
