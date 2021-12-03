const { marked } = require("marked")
const hljs = require("highlight.js")

/**
 * 根据marked内容创建vue template
 * @param {string} html marked内容
 */
function createTemplate(html) {
  let insertScript = ""
  let contents = ''

  const renderer = {
    html(text) {
      const scriptText = text.replace(/(<\/?script.*?>)/gi, "")
      if (scriptText === text) return text
      insertScript = scriptText.replace(/(^\s*)|(\s*$)/g, "")
      return ""
    },
    heading(text, level) {
      if(level > 1){
        contents += `<li class="ml-${level}"><a href="#${text}">${text}</a></li>`
      }
      return `<h${level} id="${text}">${text}<a class="header-anchor" href="#${text}">#</a></h${level}>`
    },
  }

  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
  })

  marked.use({ renderer })

  const template = `<template>
          <div class="markdown-body">
              ${marked(html)}
          </div>
          <div class="article-content" v-if="${contents !== ''}">
              <h5>目录</h5>
              <ul>
                  ${contents}
              </ul>
          </div>
      </template>
      <script setup>
          ${insertScript}
      </script>`

  return template
}

module.exports = createTemplate
