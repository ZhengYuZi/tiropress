const { createServer } = require("vite")
const vue = require("@vitejs/plugin-vue")
const path = require("path")
const mdToVue = require("./plugins/vite-plugin-mdToVue")
const { findFileDir } = require("./utils/utils")
const pressPath = findFileDir(path.resolve(".."), "tiropress")

//console.log(process.argv);

;(async () => {
  const server = await createServer({
    root: path.join(__dirname, "../../"),
    publicDir: path.resolve(pressPath, "../public"),
    plugins: [mdToVue(), vue({ include: [/\.vue$/, /\.md$/] })],
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
        "@md": path.resolve(pressPath, ".."),
      },
    },
    server: {
      port: 3000,
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
    },
  })
  await server.listen()
})()
