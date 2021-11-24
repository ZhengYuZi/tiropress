module.exports = {
  title: "tiropress", // 顶部左侧标题
  themeConfig: {
    sidebar: {
      // 侧边栏
      "/": [
        {
          text: "介绍",
          children: [
            { text: "什么是tiropress", link: "/" },
            { text: "开始使用", link: "/guide/start" },
            { text: "文件配置", link: "/guide/configuration" },
            { text: "路径配置", link: "/guide/path" },
          ]
        }
      ]
    }
  }
}
