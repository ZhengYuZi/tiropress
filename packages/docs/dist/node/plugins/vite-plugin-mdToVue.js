const path = require("path")
const { findFileDir } = require("../utils/utils")
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
      let replaceStr = ''
      config.head.forEach(value=>{
        if(typeof value[0] !== 'string') {
          value.reverse()
        }
        const keys = Object.keys(value[1])
        let attr = ''
        keys.forEach(item=>{
          attr += ` ${item}="${value[1][item]}"`
        })
        replaceStr += `<${value[0]}${attr} />`
      })
      html = html.replace('{{headmore}}', replaceStr)
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
          item.children.forEach((child) => {
            if (child.link === "/") {
              child.component = `../../../../${mdPath}/index.md`
            } else {
              child.component = `../../../../${mdPath}${child.link}.md`
            }
          })
        })
        return `export default ${JSON.stringify(sidebar)}`
      }
      return null
    },
    transform(code, id) {
      if (id.endsWith(".md")) {
        return createTemplate(code)
      }
      return code
    },
  }
}
