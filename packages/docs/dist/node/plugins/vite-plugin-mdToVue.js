const path = require("path")
const { findFileDir } = require("../utils")
const createTemplate = require('../marked')

const pressPath = findFileDir(path.resolve(".."), "tiropress")
const esmPressPath = pressPath.replace(/\\/g, "/")
const mdPath = path.resolve(pressPath,'..').replace(path.resolve("..")+'\\','').replace(/\\/g, "/")

const config = require(`${pressPath}\\config.js`) // tiropress config

module.exports = function mdToVue() {
  return {
    name: "md-to-vue",
    transformIndexHtml(html) {
      console.log("transformIndexHtml")
      return html
    },
    resolveId(source) {
      if (source === "themeIndex" || source === "pressConfig" || source.indexOf('**') !== -1) {
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
        sidebar.forEach(item=>{
          item.children.forEach(child=>{
            if(child.link === '/'){
              child.component = `../../../../${mdPath}/index.md`
            }else{
              child.component = `../../../../${mdPath}${child.link}.md`
            }
          })
        })
        return `export default ${JSON.stringify(sidebar)}`
      }
      return null
    },
    transform(code, id) {
        if(id.endsWith('.md')){
            console.log(code);
            return createTemplate(code)
        }
        return code
    }
  }
}
