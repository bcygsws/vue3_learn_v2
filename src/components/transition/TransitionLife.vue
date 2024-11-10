<template>
  <div class="main">
    <h3>3.transition的生命周期</h3>
    <button @click="flag = !flag">点击按钮，切换动画</button>
    <!-- transition的生命周期：@before-enter @enter @after-enter @before-leave @leave @after-leave  -->
    <transition
      @before-enter="enterHook"
      @after-leave="afterLeaveHook"
      name="ani"
    >
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script lang="ts">
/**
 *
 * @ 三、transition的生命周期钩子
 * @before-enter
 * @enter
 * @after-enter
 *
 * @before-leave
 * @leave
 * @after-leave
 * 
 * 优缺点：
 * 1.transition的生命周期钩子只适合在某个阶段，进行某种操作很方便；
 * 2.不适用于操作动画，利用生命周期钩子操作动画，
 * 会操作DOM,影响应用的性能；设置动画还是为transition设置name属性，最简洁（Transition.vue中方式一最简洁）
 * 
 *
 */
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'TransitionLife',
  setup() {
    const flag = ref(true);
    const enterHook = (el: HTMLElement) => {
      console.log('transition过渡进入的钩子调用了', el);
    };
    // const beforeLeaveHook = (el: HTMLElement) => {
    //   el.style.width = '100px';
    //   el.style.height = '100px';
    //   el.style.opacity = '1';
    // };
    // const leaveHook = (el: HTMLElement) => {
    //   el.style.transition = 'all 2s ease';
    //   console.log('transition过渡离开的钩子调用了', el);
    // };
    const afterLeaveHook = (el: HTMLElement) => {
     console.log('transition过渡动画离开的钩子调用了',el);
    };
    return {
      flag,
      enterHook,
      afterLeaveHook
      // leaveHook,
      // beforeLeaveHook,
    };
  }
});
</script>
<style lang="scss" scoped>
.main {
  flex: 1;
  margin: 14px;
  border: 1px solid #ccc;
  overflow: auto;
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
  }
  .ani-leave-from {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
  .ani-leave-active {
    transition: all 2s ease;
  }
  .ani-leave-to {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
