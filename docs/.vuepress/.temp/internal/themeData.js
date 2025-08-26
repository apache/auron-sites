export const themeData = JSON.parse("{\"logo\":\"/logo-mini.png\",\"home\":\"/\",\"colorMode\":\"light\",\"colorModeSwitch\":false,\"repo\":\"kwai/blaze\",\"sidebarDepth\":1,\"lastUpdated\":false,\"contributors\":false,\"editLink\":false,\"sidebar\":[{\"text\":\"Introduction\",\"link\":\"/introduction\"},{\"text\":\"Documents\",\"prefix\":\"documents\",\"children\":[\"/documents/getting-started\",\"/documents/configuration\",\"/documents/benchmarks\"]},{\"text\":\"Archives\",\"prefix\":\"archives\",\"children\":[\"/archives/v5.0.0\",\"/archives/v4.0.1\",\"/archives/v4.0.0\",\"/archives/all-releases\"]},{\"text\":\"Blogs\",\"link\":\"/references\"}],\"navbar\":[{\"text\":\"Introduction\",\"link\":\"/introduction\"},{\"text\":\"Documentations\",\"children\":[{\"text\":\"Getting Started\",\"link\":\"/documents/getting-started\"},{\"text\":\"Configuration\",\"link\":\"/documents/configuration\"},{\"text\":\"Benchmarks\",\"link\":\"/documents/benchmarks\"}]},{\"text\":\"Archives\",\"children\":[{\"text\":\"v5.0.0\",\"link\":\"/archives/v5.0.0\"},{\"text\":\"v4.0.1\",\"link\":\"/archives/v4.0.1\"},{\"text\":\"v4.0.0\",\"link\":\"/archives/v4.0.0\"},{\"text\":\"All Archived Releases\",\"link\":\"/archives/all-releases\"}]},{\"text\":\"Blogs\",\"link\":\"/references\"}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"editLinkText\":\"Edit this page\",\"lastUpdatedText\":\"Last Updated\",\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
