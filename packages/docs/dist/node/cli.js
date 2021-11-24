const { createServer } = require("vite")
const vue = require("@vitejs/plugin-vue")
const path = require("path")
const fs = require("fs")
const { findFileDir } = require("./utils")
const installComps = require('./comps/installComps')

const pressPath = findFileDir(path.resolve(".."), "tiropress") //找到 tiropress 目录

const config = require(`${pressPath}\\config.js`)  // tiropress config

const mount = path.join(__dirname,'../../dist/client/mount.js')  //mount.js目录

const mountFileUrl = path.resolve(`${pressPath}\\theme\\index.js`).replace(/\\/g,"/")

fs.writeFile(mount, installComps(mountFileUrl), (err, data) => {
    if (err) {
        throw err
    }
})

;(async () => {
  const server = await createServer({
    configFile: false,
    mode: 'development',
    root: path.join(__dirname, "../../"),
    plugins: [vue()],
    server: {
      port: 3000,
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
    },
  })
  await server.listen()
})()