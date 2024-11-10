<template>
  <!-- 不使用toRefs版本 -->
  <!-- <p>姓名：{{ info.name }}</p>
  <p>年龄：{{ info.age }}</p> -->
  <!-- 使用toRefs的版本 -->
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
export default defineComponent({
  name: 'ToRefs1',
  setup() {
    const info = reactive({
      name: '张仲景',
      age: 78
    });
    // toRefs将影响式的数据对象info,变成普通对象{name,age}，它的每一个属性都是一个ref(为了不丢失其响应式)
    // name，age都是ref，既然是ref了，在setup回调函数中涉及name，age的操作；都要加.value
    const { name, age } = toRefs(info);
    setInterval(function () {
      // info.name += '**';
      // 同toRefs处理，解构出来的name，是ref
      // name.value += '**';
    }, 2000);
    // return { info };
    return { name, age };
  }
});
/**
 * @ toRefs很重要
 * 作用：将一个reactive包裹的响应式对象转换成一个普通对象，普通对象的每一个属性都是一个ref
 * 使用场景：在自定义hook，或者在其他使用reactive包裹的对象数据的场合时，在不丢失其响应式的情况下，将对象进行分解使用
 *
 * 改进：我们希望直接使用name,age这两个变量，并将其引进到模板中使用，而且不能丢失其响应式
 *
 */
</script>
