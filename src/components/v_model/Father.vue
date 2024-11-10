<template>
  <div>
    <h3>十七、v-model实现父子组件通信</h3>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
    <!-- vue3中props接收 -->
    <Son v-model:list="list" @toFatInc="_inc" @toFatDec="_dec"></Son>
    <!-- 展示子组件中改变父组件中的值 -->
    <p>加法值：{{count}}</p>
    <p>减法值：{{count1}}</p>
  </div>
</template>

<script lang="ts" setup>
// 使用setup语法糖
import { ref } from 'vue';
// 引入子组件Son
import Son from './Son.vue';
const list = ref(['HTML', 'CSS', 'JavaScript']);
// 接收子组件分发的事件参数
const count=ref(0);
const count1=ref(0);
const _inc = (val) => {
  count.value=val;
};
const _dec = (val) => {
  count1.value=val;
};
</script>
<style scoped lang="scss"></style>
