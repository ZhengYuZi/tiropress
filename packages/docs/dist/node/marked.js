const { marked } = require("marked")
const hljs = require("highlight.js")

function createTemplate(html) {
  let insertScript = ""

  const renderer = {
    html(text) {
      const scriptText = text.replace(/(<\/?script.*?>)/gi, "")
      if (scriptText === text) return text
      insertScript = scriptText.replace(/(^\s*)|(\s*$)/g, "")
      return ""
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
      </template>
      <script setup>
          ${insertScript}
      </script>`

  return template
}

module.exports = createTemplate
