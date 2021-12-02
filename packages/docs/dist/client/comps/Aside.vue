<template>
    <div class="sidebar-container">
        <ul class="sidebar-links" v-if="props.data && props.data.site >= 0">
            <li v-for="item in config[props.data.site].contents" :key="item">
                <h4 class="links-title">{{ item.text }}</h4>
                <ul>
                    <li class="links-item" :class="[child.link === props.data.path ? 'active':'']" v-for="child in item.children" :key="child" @click="linkTo(child.link)">
                        <span>{{ child.text }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import config from "pressConfig"
import { useRouter } from 'vue-router'
const router = useRouter()

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
    background-color: rgba(0, 121, 214, 0.3);
    border-radius: 3px;
    color: #ffffff;
}
</style>