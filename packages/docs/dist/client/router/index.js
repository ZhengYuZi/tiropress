import { createRouter, createWebHashHistory } from "vue-router"
import config from "pressConfig"

const comps = import.meta.glob("../../../../**/*.md")

const routes = []
const isAside = {}

config.forEach((item, index) => {
  const aside = item.hasOwnProperty("contents")
  isAside[item.path] = index
  aside &&
    item.contents.forEach((content) => {
      content.children.forEach((child) => {
        isAside[child.link] = isAside[item.path]
        routes.push({
          path: child.link,
          name: child.text,
          component: comps[child.component],
          meta: {
            title: `${child.title} | ${item.text}`,
          },
        })
      })
    })
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

//路由发生变化修改页面title
router.beforeEach((to, from, next) => {
  to.params.hasAside = isAside[to.path]
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
