<template>
  <h3>生命周期钩子vue2和vue3对比</h3>
  <p>{{ msg }}</p>
  <button @click="changeMsg">点击按钮，改变msg的值，观察执行的钩子</button>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue';
/**
 *
 * @ vue2 和vue3生命周期钩子的对比
 * 使用FatLife父级组件和Life子级组件演示vue3的生命周期钩子
 * 1.vue3中vue2的钩子还是可以书写的
 *  vue2中8个+errorCaptured，共9个钩子
 *  vue3中上面9个+调试用的两个onRenderTracked和onRenderTriggered,其中beforeCreate和created,在vue3.x中被setup代替
 * 2.vue3中钩子的主要变化时，组件销毁阶段的两个钩子名称：beforeDestroy变成beforeUnmount,destroyed变成了unmounted
 * 3.vue3的生命周期钩子，在setup中声明，on+钩子名(驼峰命名法)的格式，on
 *
 */
export default defineComponent({
  name: 'Life',
  // 生命周期钩子
  beforeCreate() {
    console.log('vue2.x中的beforeCreate');
  },
  created() {
    console.log('vue2.x中的created');
  },
  beforeMount() {
    console.log('vue2.x中的beforeMount');
  },
  mounted() {
    console.log('vue2.x中的mounted');
  },
  beforeUpdate() {
    console.log('vue2.x中的beforeUpdate');
  },
  updated() {
    console.log('vue2.x中的updated');
  },
  beforeUnmount() {
    console.log('vue2.x中的beforeUnmount');
  },
  unmounted() {
    console.log('vue2.x中的unmounted');
  },
  setup() {
    console.log('vue3.x中setup代替vue2.x中的beforeCreate和created');
    const msg = ref('人生七十古来稀');
    // 点击按钮，改变msg的值
    function changeMsg() {
      msg.value += '**';
    }
    // vue3.x中的钩子
    onBeforeMount(() => {
      console.log('vue3.x中的beforeMount钩子');
    });
    onMounted(() => {
      console.log('vue3.x中的mounted钩子');
    });
    onBeforeUpdate(() => {
      console.log('vue3.x中的beforeUpdate钩子');
    });
    onUpdated(() => {
      console.log('vue3.x中的updated钩子');
    });
    onBeforeUnmount(() => {
      console.log('vue3.x中的beforeUnmount钩子');
    });
    onUnmounted(() => {
      console.log('vue3.x中的unmounted钩子');
    });
    return {
      msg,
      changeMsg
    };
  }
});
/* 
初始化时执行结果：
得出的结论：
1.setup执行在vue2中的beforeCreate之前，前面在分析【setup的调用时机】时已经验证过
2.同一种钩子，vue3.x比vue2.x更快执行
 vue3的性能提升:
a.打包大小减少41%
初次渲染快55%, 更新渲染快133%
内存减少54%
b.使用Proxy代替defineProperty实现数据响应式
c.重写虚拟DOM的实现和Tree-Shaking

数字指标：初始渲染vue3比vue2快55%
 vue3.x中setup代替vue2.x中的beforeCreate和created
 vue2.x中的beforeCreate
 vue2.x中的created
 vue3.x中的beforeMount钩子
 vue2.x中的beforeMount
 vue3.x中的mounted钩子
 vue2.x中的mounted


 点击【点击按钮，改变msg的值，观察执行的钩子】后，执行的结果
 数字指标：更新渲染：vue3比vue2快133%

 vue3.x中的beforeUpdate钩子
 vue2.x中的beforeUpdate
 vue3.x中的updated钩子
 vue2.x中的updated

 点击【点击按钮，销毁Life组件】销毁组件，再次验证
 vue3.x中的beforeUnmount钩子
 vue2.x中的beforeUnmount
 vue3.x中的unmounted钩子
 vue2.x中的unmounted


*/
</script>
