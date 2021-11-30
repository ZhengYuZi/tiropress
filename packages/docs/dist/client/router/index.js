import { createRouter, createWebHashHistory } from 'vue-router'
import config from 'pressConfig'

const comps = import.meta.glob('../../../../**/*.md')

const routes = []

config.forEach(item=>{
    item.children.forEach((child)=>{
        routes.push({
            path: child.link,
            name: child.text,
            component: comps[child.component],
            meta: {
                title: `${child.title} | ${item.text}`
            }
        })
    })
})

console.log(routes);

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

//路由发生变化修改页面title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router