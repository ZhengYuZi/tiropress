//import NotFound from "../comps/NotFound.vue"
import { createRouter, createWebHistory } from "vue-router"
import config from "pressConfig"

const comps = import.meta.glob("../../../../**/*.md")

const routes = [
  {
    path: "/not-found",
    name: 'NotFound',
    component: ()=>import('../comps/NotFound.vue'),
    meta: {
      title: 404,
    },
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/not-found",
  },
]

const contents = {}

config.forEach((item, index) => {
  const aside = item.hasOwnProperty("contents")
  if (aside && item.contents.length) {
    contents[item.path] = []
    item.contents.forEach((content, num) => {
      contents[item.path].push({
        title: content.text,
        children: [],
      })
      content.children.forEach((child) => {
        if (child.link === "/") {
          child.link = ""
        }
        routes.unshift({
          path: `${item.path}${child.link}`,
          name: `${child.text}`,
          component: comps[child.component],
          meta: {
            title: `${child.title} | ${item.text}`,
          },
        })
        contents[item.path][num].children.push({
          title: child.text,
          path: `${item.path}${child.link}`,
        })
      })
    })
  } else {
    routes.unshift({
      path: item.path,
      name: `${item.text}`,
      component: comps[item.component],
      meta: {
        title: item.text,
      }
    })
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      }
    }
  }
})

//路由发生变化修改页面title
router.beforeEach((to, from, next) => {
  const path = "/" + to.path.split("/")[1]
  to.params = contents[path]
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
