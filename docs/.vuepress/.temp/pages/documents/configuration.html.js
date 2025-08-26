import comp from "/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/documents/configuration.html.vue"
const data = JSON.parse("{\"path\":\"/documents/configuration.html\",\"title\":\"Configurations\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Configurations\"},\"headers\":[{\"level\":2,\"title\":\"Auron Runtime Parameter\",\"slug\":\"auron-runtime-parameter\",\"link\":\"#auron-runtime-parameter\",\"children\":[]},{\"level\":2,\"title\":\"Native Operators Switch\",\"slug\":\"native-operators-switch\",\"link\":\"#native-operators-switch\",\"children\":[]},{\"level\":2,\"title\":\"Expression/UDF switch\",\"slug\":\"expression-udf-switch\",\"link\":\"#expression-udf-switch\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"documents/configuration.md\"}")
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
