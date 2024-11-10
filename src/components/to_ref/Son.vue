<template>
  <h4>这是ToRef的子组件Son</h4>
  <!-- 在其父组件中点击按钮，age也同步变化 -->
  <p>Son子组件年龄：{{ age }}</p>
  <!-- ToRef父组件组state.money渲染的金额不会发生改变，一直是2000 -->
  <p>Son子组件金额：{{ money }}</p>
  <!-- 增加一个需求，如果要拿到传入的数据位数，length怎么办?而且getLength函数是别人封装的，传入的参数是Ref类型 -->
  <p>length:{{ length }}</p>
</template>
<script lang="ts">
import { defineComponent, toRef, computed, Ref } from 'vue';
// 别人封装的获取长度函数
// const getLength=computed((age:Ref)=>{})
function getLength(age: Ref) {
  // 数据age只要变化，就计算长度，需要监听
  // 这种属于只有getter的computed的监听
  return computed(() => {
    // number-->string, age.value.toString()方法转换成字符串，字符串或数组才有length属性
    return age.value.toString().length; // 数值型表达式，number类型；则getLength(age: Ref)的返回值仍然是number类型
  });
}
export default defineComponent({
  name: 'Son',
  props: {
    age: {
      type: Number,
      required: true // required关键字声明，必须接收的props属性
    },
    money: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    // 要使用传入的age,使用setup的参数props
    // 打印props，发现props是一个代理对象Proxy{ }，里面包含的是父组件传入，且使用props选项接收的属性
    console.log(props);
    // 别人定义的函数getLength参数接收的是Ref类型数据，props中接收的父组件toRef传递过来的age,是普通数值；
    // 而目前age是number类型数据，因此需要把number类型转换成Ref类型
    const length = getLength(toRef(props, 'age'));
    return {
      length
    };
  }
});
/**
 *
 *  @ age:Ref
 * 目前的参数是number类型，number类型转换成Ref类型，才能通过类型校验
 * toRef(props,'age');
 *
 */
</script>
