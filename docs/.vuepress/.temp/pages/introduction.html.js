import comp from "/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/introduction.html.vue"
const data = JSON.parse("{\"path\":\"/introduction.html\",\"title\":\"Introduction\",\"lang\":\"en-US\",\"frontmatter\":{\"title\":\"Introduction\"},\"headers\":[{\"level\":2,\"title\":\"Overview\",\"slug\":\"overview\",\"link\":\"#overview\",\"children\":[]},{\"level\":2,\"title\":\"Introduction\",\"slug\":\"introduction\",\"link\":\"#introduction\",\"children\":[{\"level\":3,\"title\":\"Problem Statement\",\"slug\":\"problem-statement\",\"link\":\"#problem-statement\",\"children\":[]},{\"level\":3,\"title\":\"Auron’s Solution\",\"slug\":\"auron-s-solution\",\"link\":\"#auron-s-solution\",\"children\":[]},{\"level\":3,\"title\":\"Target User\",\"slug\":\"target-user\",\"link\":\"#target-user\",\"children\":[]}]},{\"level\":2,\"title\":\"Architecture\",\"slug\":\"architecture\",\"link\":\"#architecture\",\"children\":[{\"level\":3,\"title\":\"Currently Supported Native Operators/Expressions\",\"slug\":\"currently-supported-native-operators-expressions\",\"link\":\"#currently-supported-native-operators-expressions\",\"children\":[]}]},{\"level\":2,\"title\":\"Join the Community\",\"slug\":\"join-the-community\",\"link\":\"#join-the-community\",\"children\":[{\"level\":3,\"title\":\"Source Code\",\"slug\":\"source-code\",\"link\":\"#source-code\",\"children\":[]},{\"level\":3,\"title\":\"Community\",\"slug\":\"community\",\"link\":\"#community\",\"children\":[]},{\"level\":3,\"title\":\"WeChat Group\",\"slug\":\"wechat-group\",\"link\":\"#wechat-group\",\"children\":[]}]},{\"level\":2,\"title\":\"Performance\",\"slug\":\"performance\",\"link\":\"#performance\",\"children\":[]},{\"level\":2,\"title\":\"Thanks to our contributors\",\"slug\":\"thanks-to-our-contributors\",\"link\":\"#thanks-to-our-contributors\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"introduction.md\"}")
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
