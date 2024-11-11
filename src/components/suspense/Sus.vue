<template>
  <div>
    <h3>十六、Suspense标签为等待异步加载组件时提供后备内容</h3>
    <!-- 定时器模拟异步组件UseSuspense -->
    <Suspense>
      <template v-slot:default>
        <UsePromise></UsePromise>
      </template>
      <template v-slot:fallback>
        <h4>正在加载中……</h4>
      </template>
    </Suspense>
    <!-- 动态导入同步组件模拟这种异步,Network中调成slow 3G才能看到效果 -->
    <!-- 这是具名插槽的一个实现,在Suspense组件中的应用，父组件提供模板，在子组件中引用 -->
    <Suspense>
      <template v-slot:default><UseAsyncCom></UseAsyncCom></template>
      <template v-slot:fallback><h3>加载中……</h3></template>
    </Suspense>
    <!-- 使用axios请求数据，模拟异步组件的加载 -->
    <Suspense>
      <template #default><UseAxios></UseAxios></template>
      <template #fallback><h3>加载中……</h3></template>
    </Suspense>
    <!-- 使用async await的方式 -->
    <Suspense>
      <template v-slot:default><UseAwait></UseAwait></template>
      <template v-slot:fallback><h3>加载中……</h3></template>
    </Suspense>
  </div>
</template>

<script lang="ts">
/**
 *
 * 一、Suspense Vue3新组件
 * 用途：为等待加载的异步组件添加后备内容
 *
 * 1.Suspense中的两个template标签实际上是一个选择结构，类似v-if 和v-else-if
 * 2.vue3新组件的出现，对分支选择进行了简化，使得程序开发者在展示后备内容时（<template v-slot:fallback），后备内容
 * 可以直接在模板中编写
 * 3.而更多的让程序开发者，把注意力集中在v-slot:default这个分支上
 *  3.1.defineAsyncComponent(()=>import('路径'))
 *  3.2.使用axios
 *  3.3.使用promise
 *  3.4.使用await解构
 *
 *
 *
 */
import { defineComponent, defineAsyncComponent } from 'vue';
import UsePromise from './UsePromise.vue';
import UseAxios from './UseAxios.vue';
import UseAwait from './UseAwait.vue';
// 动态导入同步组件，模拟异步
const UseAsyncCom = defineAsyncComponent(() => import('./UseAsyncCom.vue'));
export default defineComponent({
  name: 'Sus',
  components: {
    UsePromise,
    UseAsyncCom,
    UseAxios,
    UseAwait
  }
});
</script>
<style lang="scss" scoped></style>
