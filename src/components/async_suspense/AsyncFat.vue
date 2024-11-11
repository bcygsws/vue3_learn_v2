<!-- 演示Suspense后备组件的使用 -->
<template>
  <br />
  <button @click="showAsync">展示异步组件</button>
  <template v-if="isShowButton">
    <!-- Vue3新组件：Suspense是用于为等待异步组件渲染时，添加一些后备内容，创建一个平滑的用户体验 -->
    <Suspense>
      <template #default>
        <Async></Async>
      </template>
      <template #fallback>
        <div>组件正加载中……</div>
      </template>
    </Suspense>
  </template>
</template>
<script lang="ts">
/**
 *
 * Suspense组件
 * 为异步组件渲染等待时提供一些后备内容，以获得平滑的用户体验
 * 使用Suspense组件
 *
 */
import { ref, defineAsyncComponent } from 'vue';
const Async = defineAsyncComponent(() => import('./Async.vue'));
export default {
  components: { Async },
  setup() {
    // 默认值为false的布尔类型变量
    const isShowButton = ref(false);
    // 点击按钮，显示后备组件Suspense
    function showAsync() {
      isShowButton.value = true;
    }
    return {
      showAsync,
      isShowButton
    };
  }
};
</script>
