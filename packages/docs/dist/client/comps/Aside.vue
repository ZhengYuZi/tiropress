<template>
    <div class="sidebar-container">
        <div class="sidebar-logo">
            <a href="/">
                <img src="https://element-plus.gitee.io/images/element-plus-logo.svg" alt="">
            </a>
        </div>
        <ul class="sidebar-links">
            <li v-for="item in data" :key="item">
                <h4 class="links-title">{{ item.title }}</h4>
                <ul>
                    <li class="links-item" :class="[child.path === route.path ? 'active':'']" v-for="child in item.children" :key="child" @click="linkTo(child.path)">
                        <span>{{ child.title }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const props = defineProps({
    data: {
        type: Object
    }
})

const linkTo = (link) => {
    router.push({ path: link })
}

</script>

<style scoped>
.sidebar-container{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 30px 20px;
    box-sizing: border-box;
}

.sidebar-logo{
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 0 20px 10px;
}

.sidebar-container ul{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #111827;
}

.sidebar-container .links-item{
    cursor: pointer;
    padding: 10px 0px;
    margin: 2px 0px;
    color: #6b7280;
    max-width: 210px;
}

.sidebar-container .sidebar-links .links-title, .sidebar-container .sidebar-links .links-item{
    padding-left: 10px;
}

.sidebar-container .links-item:hover{
    color: #000000;
    border-radius: 3px;
    background-color: rgba(240, 240, 240);
}

.sidebar-container .links-item.active{
    background-color: rgba(0, 132, 255,0.5);
    border-radius: 3px;
    color: #ffffff;
}
</style>