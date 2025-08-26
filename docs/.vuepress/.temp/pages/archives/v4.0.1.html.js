import comp from "/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/archives/v4.0.1.html.vue"
const data = JSON.parse("{\"path\":\"/archives/v4.0.1.html\",\"title\":\"v4.0.1\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"v4.0.1\"},\"headers\":[{\"level\":2,\"title\":\"New Feature\",\"slug\":\"new-feature\",\"link\":\"#new-feature\",\"children\":[]},{\"level\":2,\"title\":\"Improvement\",\"slug\":\"improvement\",\"link\":\"#improvement\",\"children\":[]},{\"level\":2,\"title\":\"Bug fixes\",\"slug\":\"bug-fixes\",\"link\":\"#bug-fixes\",\"children\":[]},{\"level\":2,\"title\":\"Other\",\"slug\":\"other\",\"link\":\"#other\",\"children\":[]},{\"level\":2,\"title\":\"Download\",\"slug\":\"download\",\"link\":\"#download\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"archives/v4.0.1.md\"}")
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
