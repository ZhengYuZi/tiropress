<template>
    <div class="sidebar-container">
        <div class="sidebar-logo">
            <a @click="linkTo('/')">
                <img src="/logo.png" alt />
                <span>TiroPress</span>
            </a>
        </div>
        <ul class="sidebar-links">
            <template v-if="data.length">
                <li v-for="item in data" :key="item">
                    <h4 class="links-title">{{ item.title }}</h4>
                    <ul>
                        <li
                            class="links-item"
                            :class="[child.path === route.path ? 'active' : '']"
                            v-for="child in item.children"
                            :key="child"
                            @click="linkTo(child.path)"
                        >
                            <span>{{ child.title }}</span>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const props = defineProps({
    data: {
        type: Array
    }
})

const linkTo = (link) => {
    router.push({ path: link })
}

</script>

<style scoped>
.sidebar-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 30px 20px;
    box-sizing: border-box;
}

.sidebar-logo {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 20px 10px;
    cursor: pointer;
}
.sidebar-logo a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #000000;
    font-weight: 500;
    font-size: 20px;
}
.sidebar-logo a span {
    padding: 0 5px;
}
.sidebar-logo img {
    width: auto;
    height: 40px;
}

.sidebar-container ul {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #111827;
}

.sidebar-container .links-item {
    cursor: pointer;
    padding: 10px 0px;
    margin: 2px 0px;
    color: #6b7280;
    max-width: 210px;
}

.sidebar-container .sidebar-links .links-title,
.sidebar-container .sidebar-links .links-item {
    padding-left: 10px;
}

.sidebar-container .links-item:hover {
    color: #000000;
    border-radius: 3px;
    background-color: rgb(246, 246, 246);
}

.sidebar-container .links-item.active {
    background-color: rgba(51, 112, 255, 0.06);
    border-radius: 3px;
    color: rgb(51, 112, 255);
}
</style>