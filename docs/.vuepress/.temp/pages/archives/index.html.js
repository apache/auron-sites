import comp from "/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/archives/index.html.vue"
const data = JSON.parse("{\"path\":\"/archives/\",\"title\":\"Archives\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Archives\"},\"headers\":[],\"git\":{},\"filePathRelative\":\"archives/README.md\"}")
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
