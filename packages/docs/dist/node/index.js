const { marked } = require("marked")
const watch = require("./watch")
const fs = require("fs") //文件模块
const path = require("path") //路径模块
const hljs = require("highlight.js")

const watchFile = path.join(__dirname, `../src/markdown`)
const convertedFile = path.join(__dirname, `../client/article`)

let script = ""

const renderer = {
  html(text) {
    scriptText = text.replace(/(<\/?script.*?>)/gi, "")
    if (scriptText === text) return text
    script = scriptText.replace(/(^\s*)|(\s*$)/g, "")
    return ""
  },
}

marked.setOptions({
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  },
})

marked.use({ renderer })

watch(watchFile)
  .on("change", fileChangeListener)
  .on("unlink", fileRemovedListener)
  .on("ready", function () {
    console.info("准备监听")
  })

// 文件内容改变时
function fileChangeListener(_path) {
  console.log("文件", _path, "已经修改")
  fs.readFile(_path, "utf-8", (err, data) => {
    //读取文件
    if (err) {
      throw err
    }
    const html = marked(data) //将md内容转为html内容
    const filename = getFileName(_path)
    createFile(filename, createTemplate(html, script))
    script = ""
  })
}

//删除文件
function fileRemovedListener(_path) {
  console.log("文件", _path, "被删除了")
  fs.unlink(`${convertedFile}/${getFileName(_path)}.vue`, function (err) {
    if (err) {
      return
    }
    console.log("文件:" + `${convertedFile}/${getFileName(_path)}.vue` + "删除成功！")
  })
}

function createTemplate(insertHtml, insertScript = "") {
  const template = `<template>
          <div class="markdown-body">
              ${insertHtml}
          </div>
      </template>
      <script setup>
          ${insertScript}
      </script>`
  return template
}

/**
 * 创建html文件
 * @param {string} content 写入html的文件内容
 */
function createFile(filename, content) {
  const suffix = "vue" //文件格式
  const fullName = filename + "." + suffix //文件全名
  const file = path.join(__dirname, `../src/converted/${fullName}`) //文件地址

  fs.writeFile(file, content, "utf-8", (err) => {
    if (err) {
      throw err
    }
    console.log("success！")
  })
}

function getFileName(url) {
  const rBegin = "(?=^s*\\b)"
  const rEnd = "(?=\\b\\s+$|$)"
  const rEndSplit = rEnd.replace("=", "!")
  const rPath =
    "((?:.split)*(?:\\w+\\.)*(?:.split)*(?:\\w+\\.)*[\\\\\\/])?".replace(
      /split/g,
      rEndSplit
    )
  const rName = "([^\\\\\\/]+?)"
  const rSuffix = "(?:\\.([^\\.\\s]+)\\b)?"

  const regContent = rBegin + rPath + rName + rSuffix + rEnd

  const reg = new RegExp(regContent, "")

  return url.match(reg)[2]
}
