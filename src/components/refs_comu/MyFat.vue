<template>
  <div>
    <h3>十八、vue组件通信之三-refs方法</h3>
    <!--在script中定义ref实例，为父组件绑定这个ref实例，就可以获取子组件暴露给父组件的数据了-->
    <MySon ref="childRef"></MySon>
    <ul>
      <!-- ?.表示子组件创建完成了，再获取childRef.list -->
      <li v-for="(item, index) in childRef?.list" :key="index">
        学科：{{ item }}
      </li>
    </ul>
    <button @click="handleExpose">点击按钮，获取子组件对外暴露的属性</button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
// 引入子组件
import MySon from './MySon.vue';

/**
 * @desc:子组件向父组件传值的一种方式
 *
 */
export interface IChild {
  list: string[];
  toFat: string;
  toFatMet: Function;
}

const childRef = ref<IChild>();
const handleExpose = () => {
  console.log(childRef);
  console.log(childRef.value); // childRef.value是一个代理对象，是代理对象就能够深度监视
  console.log(childRef.value?.list); // Proxy{0: 'HTML', 1: 'CSS', 2: 'JavaScript'}
  console.log(childRef.value?.toFat); // 我是子组件数据
  childRef.value?.toFatMet(); // 传给父组件的方法toFatMet
};
console.log(childRef.value);// null 初次渲染时，childRef.value为null
// const { list, toFat, toFatMet } = childRef.value;
// console.log(list); // Proxy{0: 'HTML', 1: 'CSS', 2: 'JavaScript'}
// console.log(toFat); // 我是子组件数据
// toFatMet(); // 传给父组件的方法toFatMet
</script>
<style lang="scss" scoped></style>
