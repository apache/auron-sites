import comp from "/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/documents/getting-started.html.vue"
const data = JSON.parse("{\"path\":\"/documents/getting-started.html\",\"title\":\"Getting-Started\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Getting-Started\"},\"headers\":[{\"level\":2,\"title\":\"Build from source\",\"slug\":\"build-from-source\",\"link\":\"#build-from-source\",\"children\":[]},{\"level\":2,\"title\":\"Build with docker\",\"slug\":\"build-with-docker\",\"link\":\"#build-with-docker\",\"children\":[]},{\"level\":2,\"title\":\"Run Spark Job with Auron Accelerator\",\"slug\":\"run-spark-job-with-auron-accelerator\",\"link\":\"#run-spark-job-with-auron-accelerator\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"documents/getting-started.md\"}")
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
