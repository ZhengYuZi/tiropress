const { createServer, build } = require("vite")
const vue = require("@vitejs/plugin-vue")
const path = require("path")
const mdToVue = require("./plugins/vite-plugin-mdToVue")
const { findFileDir } = require("./utils/utils")
const pressPath = findFileDir(path.resolve(".."), "tiropress")

const env = process.env.npm_lifecycle_event

;(async (e) => {
  const development = "docs:dev"
  const production = "docs:build"

  if (e === development) {
    const server = await createServer({
      root: path.join(__dirname, "../../"),
      publicDir: path.resolve(pressPath, "../public"),
      plugins: [mdToVue(), vue({ include: [/\.vue$/, /\.md$/] })],
      resolve: {
        alias: {
          "@md": path.resolve(pressPath, ".."),
        },
      },
      server: {
        port: 3000,
        open: true,
        cors: true,
      },
    })
    await server.listen()

  } else if(e === production){
    await build({
      root: path.join(__dirname, "../../"),
      base: '/',
      publicDir: path.resolve(pressPath, "../public"),
      plugins: [mdToVue(), vue({ include: [/\.vue$/, /\.md$/] })],
      resolve: {
        alias: {
          "@md": path.resolve(pressPath, ".."),
        },
      },
      build: {
        outDir: '../dist',
      }
    })
  }
})(env)
