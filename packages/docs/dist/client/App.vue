<template>
    <div id="App">
        <div class="main-container">
            <aside class="sidebar" v-if="asideData?.length">
                <AsidePage :data="asideData" />
            </aside>
            <main class="page">
                <article>
                    <router-view />
                </article>
                <ArrowPage :data="arrowData" v-if="arrowData" />
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import AsidePage from './comps/Aside.vue'
import ArrowPage from './comps/Arrow.vue'

const route = useRoute()
const asideData = ref([])
const arrowData = ref(null)

watchEffect(()=>{
    const params = route.params
    asideData.value = params
    arrowData.value = null
    if(Array.isArray(params)){
        arrowData.value = getArrow(params)
    }
})

const getArrow=(params)=>{
    let children = []
    let data = {}
    params.forEach(item=>{
        children.push(...item.children)
    })
    children.forEach((item,index)=>{
        if(item.path === route.path){
            data.last = children[index-1]
            data.next = children[index+1]
        }
    })
    return data
}

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
    width: 100%;
    padding: 40px 50px 64px;
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
        width: 280px;
        max-width: 280px;
        height: 600px;
        font-size: 14px;
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
    #app .main-container .page .article-content ul li {
        cursor: pointer;
        padding: 6px 0;
    }
    #app .main-container .page .article-content ul li a {
        text-decoration: none;
        color: #6b7280;
    }
    #app .main-container .page .article-content ul li a:hover{
        color: #000000;
    }
    #app .main-container .page .article-content ul li.ml-3{
        margin-left: 1rem;
    }
    #app .main-container .page .article-content ul li.ml-4{
        margin-left: 2rem;
    }
    #app .main-container .page .article-content ul li.ml-5{
        margin-left: 3rem;
    }
    #app .main-container .page .article-content ul li.ml-6{
        margin-left: 4rem;
    }
}
</style>