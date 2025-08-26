import comp from "/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/archives/all-releases.html.vue"
const data = JSON.parse("{\"path\":\"/archives/all-releases.html\",\"title\":\"All Archived Releases\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"All Archived Releases\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"archives/all-releases.md\"}")
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
