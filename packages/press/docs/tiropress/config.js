module.exports = {
  title: "tiropress",
  head: [
    [
      'meta',
      {
        name: "keywords", 
        content: "tiropress文档"
      }
    ],
    [
      'link',
      {
        rel: "icon", 
        href: "https://www.tailwindcss.cn/favicon-32x32.png"
      }
    ]
  ],
  themeConfig: {
    sidebar: [
      // 侧边栏
      {
        text: "tiropress",
        path:'/',
        children: [
          { text: "什么是tiropress", link: "/", title: "什么是tiropress" },
          { text: "开始使用", link: "/article/input", title: "开始使用" },
        ]
      },
    ],
  },
}
