<template>
  <div class="arrow-container">
    <div class="arrow-inner">
      <a class="arrow-box arrow-left" :href="data.last.path" v-if="data.last">
        <i class="iconfont icon-jiantou"></i>
        <div class="arrow-info">
          <span>PREVIOUS</span>
          <span>{{ data.last.title }}</span>
        </div>
      </a>
    </div>
    <div class="arrow-inner">
      <a class="arrow-box arrow-right" :href="data.next.path" v-if="data.next" @click="">
        <i class="iconfont icon-jiantou3"></i>
        <div class="arrow-info">
          <span>NEXT</span>
          <span>{{ data.next.title }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { watchEffect } from "vue";
const props = defineProps({
  data: {
    type: Object,
  },
});
</script>

<style scoped>
.arrow-container {
  margin-top: 30px;
  padding: 50px 0;
  display: flex;
  justify-content: space-between;
}
.arrow-container .arrow-box {
  width: 15vw;
  padding: 20px 30px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #2a2f36;
}
.arrow-container .arrow-box:hover {
  background-color: rgba(51, 112, 255, 0.06);
}
.arrow-container .arrow-box:hover .arrow-info span:last-child {
  color: #3370ff;
  text-decoration: underline;
}
.arrow-container .arrow-box .arrow-info {
  padding: 0 20px;
}
.arrow-container .arrow-box .arrow-info span {
  font-size: 14px;
  line-height: 30px;
  display: block;
}
.arrow-container .arrow-box .arrow-info span:last-child {
  font-size: 16px;
}
.arrow-container .arrow-right {
  flex-direction: row-reverse;
}
.arrow-container .arrow-left .arrow-info {
  text-align: left;
}
.arrow-container .arrow-right .arrow-info {
  text-align: right;
}
</style>
>
