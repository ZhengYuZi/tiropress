const { createServer } = require("vite")
const vue = require("@vitejs/plugin-vue")
const path = require("path")
const mdToVue = require('./plugins/vite-plugin-mdToVue')

;(async () => {
  const server = await createServer({
    configFile: false,
    mode: 'development',
    root: path.join(__dirname, "../../"),
    plugins: [mdToVue(), vue({ include: [/\.vue$/, /\.md$/] })],
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-bundler.js",
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