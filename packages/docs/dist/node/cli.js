const { createServer, build } = require("vite")
const vue = require("@vitejs/plugin-vue")
const path = require("path")
const mdToVue = require("./plugins/vite-plugin-mdToVue")
const { findFileDir } = require("./utils/utils")
const pressPath = findFileDir(path.resolve(".."), "tiropress")

const env = process.env.npm_lifecycle_script

;(async (e) => {
  const development = "tiropress dev docs"
  const production = "tiropress build docs"

  const config = {
    root: path.join(__dirname, "../../"),
    base: '/',
    publicDir: path.resolve(pressPath, "../public"),
    plugins: [mdToVue(), vue({ include: [/\.vue$/, /\.md$/] })],
    server: {
      open: true,
      cors: true,
    },
    build: {
      outDir: '../dist',
    }
  }

  if (e === development) {
    const server = await createServer(config)
    await server.listen()
  } else if(e === production){
    await build(config)
  }
})(env)