import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import components from 'themeIndex'

import 'highlight.js/styles/github.css'
import './style/mweb-lark.css'
import './style/iconfont.css'

createApp(App).use(components).use(router).mount('#app')