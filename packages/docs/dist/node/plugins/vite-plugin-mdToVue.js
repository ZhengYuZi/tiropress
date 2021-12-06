const path = require("path")
const { findFileDir, configHeadFormat } = require("../utils/utils")
const createTemplate = require("../utils/marked")

const pressPath = findFileDir(path.resolve(".."), "tiropress")
const esmPressPath = pressPath.replace(/\\/g, "/")
const mdPath = path
  .resolve(pressPath, "..")
  .replace(path.resolve("..") + "\\", "")
  .replace(/\\/g, "/")

const config = require(`${pressPath}\\config.js`) // tiropress config

module.exports = function mdToVue() {
  return {
    name: "md-to-vue",
    transformIndexHtml(html) {
      const replaceStr = configHeadFormat(config.head)
      html = html.replace("{{...}}", replaceStr)
      return html
    },
    resolveId(source) {
      if (source === "themeIndex" || source === "pressConfig") {
        return source
      }
      return null
    },
    load(id) {
      if (id === "themeIndex") {
        const mountFileUrl = `${esmPressPath}/theme/index.js`

        return `import compsInstall from '${mountFileUrl}'
                const components = {}
                components.install = compsInstall
                export default components`
      }
      if (id === "pressConfig") {
        const sidebar = config.themeConfig.sidebar
        sidebar.forEach((item) => {
          if (item.path === "/") {
            item.component = `../../../../${mdPath}/index.md`
          } else {
            item.component = `../../../../${mdPath}${item.path}/index.md`
          }
          item.hasOwnProperty("contents") &&
            item.contents.forEach((content) => {
              content.children.forEach((child) => {
                if (child.link === "/") {
                  child.component = item.component
                } else {
                  child.component = `../../../../${mdPath}${item.path}${child.link}.md`
                }
              })
            })
        })
        return `export default ${JSON.stringify(sidebar)}`
      }
      return null
    },
    transform(code, id) {
      if (id.endsWith(".md")) {
        const template = createTemplate(code)
        return template
      }
      return code
    },
  }
}
