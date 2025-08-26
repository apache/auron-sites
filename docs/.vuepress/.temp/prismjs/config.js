import "/opt/workspace/auron-project.github.io/node_modules/@vuepress/highlighter-helper/lib/client/styles/base.css"
import "/opt/workspace/auron-project.github.io/node_modules/@vuepress/plugin-prismjs/lib/client/styles/nord.css"
import "/opt/workspace/auron-project.github.io/node_modules/@vuepress/highlighter-helper/lib/client/styles/line-numbers.css"
import "/opt/workspace/auron-project.github.io/node_modules/@vuepress/highlighter-helper/lib/client/styles/notation-highlight.css"
import "/opt/workspace/auron-project.github.io/node_modules/@vuepress/highlighter-helper/lib/client/styles/collapsed-lines.css"
import { setupCollapsedLines } from "/opt/workspace/auron-project.github.io/node_modules/@vuepress/highlighter-helper/lib/client/composables/collapsedLines.js"

export default {
  setup() {
    setupCollapsedLines()
  }
}
