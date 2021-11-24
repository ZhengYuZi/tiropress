import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import components from './mount'

import 'highlight.js/styles/github.css'
import './style/github-markdown.css'

createApp(App).use(router).use(components).mount('#app')