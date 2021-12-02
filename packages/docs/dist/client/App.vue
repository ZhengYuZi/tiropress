<template>
    <div id="app">
        <div class="main-container">
            <aside class="sidebar">
                <AsidePage :data="hasAside" />
            </aside>
            <main class="page">
                <article ref="article">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </article>
                <div class="article-content">
                    <h5>本页目录</h5>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AsidePage from './comps/Aside.vue'

const route = useRoute()
const hasAside = ref()

watch(
    () => route.params,
    newParams => {
        hasAside.value = {
            site: newParams.hasAside,
            path: route.path
        }
    }
)


</script>

<style>
body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Optimistic Display, -apple-system, ui-sans-serif, system-ui,
        BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans,
        sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
        Noto Color Emoji;
}
#app .main-container {
    display: flex;
}

#app .main-container .sidebar {
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    display: none;
}

#app .main-container .page {
    padding: 40px 35px 64px;
    display: flex;
}

#app .main-container .page .article-content {
    display: none;
}

@media (min-width: 1024px) {
    #app .main-container .sidebar {
        min-width: 280px;
        display: block;
    }
    #app .main-container .page {
        margin-left: 280px;
    }
}

@media (min-width: 1280px) {
    #app .main-container .page {
        margin-right: 280px;
    }
    #app .main-container .page .article-content {
        min-width: 280px;
        height: 600px;
        position: fixed;
        right: 0;
        top: 50px;
        padding: 30px;
        box-sizing: border-box;
        display: block;
    }
    #app .main-container .page .article-content ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
}
</style>