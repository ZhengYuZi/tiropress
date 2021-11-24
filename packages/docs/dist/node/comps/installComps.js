module.exports = function installComps(url){
    return `import compsInstall from '${url}'
    const components = {}
    components.install = compsInstall
    export default components`
}