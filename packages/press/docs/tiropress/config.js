module.exports = {
  title: "tiropress", // 顶部左侧标题
  themeConfig: {
    sidebar: [
      // 侧边栏
      {
        text: "介绍",
        path:'/',
        children: [
          { text: "什么是tiropress", link: "/" },
          { text: "开始使用", link: "/article/input" },
        ],
      },
    ],
  },
}
