import { createRouter, createWebHistory } from "vue-router"
import config from "pressConfig"

const comps = import.meta.glob("../../../../**/*.md")

const routes = []
const contents = {}

console.log(config)

config.forEach((item, index) => {
  routes.push({
    path: item.path,
    name: item.text,
    component: comps[item.component],
    meta: {
      title: item.text,
    },
  })
  contents[item.path] = []
  const aside = item.hasOwnProperty("contents")
  aside &&
    item.contents.forEach((content, num) => {
      contents[item.path].push({
        title: content.text,
        children: []
      })
      content.children.forEach((child) => {
        if(child.link === '/'){
          child.link = ''
        }
        routes.push({
          path: `${item.path}${child.link}`,
          name: child.text,
          component: comps[child.component],
          meta: {
            title: `${child.title} | ${item.text}`,
          },
        })
        contents[item.path][num].children.push({
          title: child.text,
          path: `${item.path}${child.link}`
        })
      })
    })
})

console.log(contents);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      }
    }
  },
})

//路由发生变化修改页面title
router.beforeEach((to, from, next) => {
  const path = '/' + to.path.split('/')[1]
  to.params = contents[path]
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
