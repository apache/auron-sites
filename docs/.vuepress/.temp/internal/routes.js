export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/introduction.html", { loader: () => import(/* webpackChunkName: "introduction.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/introduction.html.js"), meta: {"title":"Introduction"} }],
  ["/references.html", { loader: () => import(/* webpackChunkName: "references.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/references.html.js"), meta: {"title":"Auron Related Use Cases and Publications"} }],
  ["/archives/", { loader: () => import(/* webpackChunkName: "archives_index.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/archives/index.html.js"), meta: {"title":"Archives"} }],
  ["/archives/all-releases.html", { loader: () => import(/* webpackChunkName: "archives_all-releases.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/archives/all-releases.html.js"), meta: {"title":"All Archived Releases"} }],
  ["/archives/v4.0.0.html", { loader: () => import(/* webpackChunkName: "archives_v4.0.0.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/archives/v4.0.0.html.js"), meta: {"title":"v4.0.0"} }],
  ["/archives/v4.0.1.html", { loader: () => import(/* webpackChunkName: "archives_v4.0.1.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/archives/v4.0.1.html.js"), meta: {"title":"v4.0.1"} }],
  ["/archives/v5.0.0.html", { loader: () => import(/* webpackChunkName: "archives_v5.0.0.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/archives/v5.0.0.html.js"), meta: {"title":"v5.0.0"} }],
  ["/documents/benchmarks.html", { loader: () => import(/* webpackChunkName: "documents_benchmarks.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/documents/benchmarks.html.js"), meta: {"title":"Benchmarks"} }],
  ["/documents/configuration.html", { loader: () => import(/* webpackChunkName: "documents_configuration.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/documents/configuration.html.js"), meta: {"title":"Configurations"} }],
  ["/documents/getting-started.html", { loader: () => import(/* webpackChunkName: "documents_getting-started.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/documents/getting-started.html.js"), meta: {"title":"Getting-Started"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/opt/workspace/auron-project.github.io/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
