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
        href: "/logo.png"
      }
    ]
  ],
  themeConfig: {
    sidebar: [
      // 侧边栏
      {
        text: "tiropress",
        path: '/',
      },
      {
        text: "test",
        path: '/article',
        contents: [
          {
            text: '入门',
            children: [
              { text: "开始", link: "/", title: "开始" },
              { text: "使用", link: "/input", title: "使用" },
            ]
          },
          {
            text: '基础组件',
            children: [
              { text: "边框", link: "/border", title: "边框" },
              { text: "按钮", link: "/button", title: "按钮" },
            ]
          }
        ]
      }
    ],
  },
}
