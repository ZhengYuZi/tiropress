const { marked } = require("marked")
const hljs = require("highlight.js")

/**
 * 根据marked内容创建vue template
 * @param {string} html marked内容
 */
function createTemplate(html) {
  let insertScript = ""
  let contents = []

  const renderer = {
    html(text) {
      const scriptText = text.replace(/(<\/?script.*?>)/gi, "")
      if (scriptText === text) return text
      insertScript = scriptText.replace(/(^\s*)|(\s*$)/g, "")
      return ""
    },
    heading(text, level) {
      contents.push({
        level: level,
        title: text
      })
      return `<h${level}>${text}</h${level}>`
    }
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
      </template>
      <script setup>
          ${insertScript}
      </script>`

  return {
    template,
    contents
  }
}

module.exports = createTemplate
