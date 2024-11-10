<template>
  <div class="main">
    <h3>4.使用GSAP实现丝滑动画</h3>
    <button @click="flag = !flag">点击按钮，切换动画</button>
    <!-- transition的生命周期：@before-enter @enter @after-enter @before-leave @leave @after-leave  -->
    <transition
      @before-enter="beforeEnter"
      @enter="enterActive"
      @leave="leaveActive"
    >
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script lang="ts">
/**
 *
 * @ 使用gsap + animate.css插件，实现丝滑动画 读作吉塞普
 * cnpm i gsap --save
 * cnpm i animate.css --save
 *
 * gsap除了可以设置过渡效果外，还能设置一个reactive对象的过渡效果，
 * 在GSAPWatch中监听了num(定义的一个reactive对象)
 *
 * 二、跨组件动画，使用gsap+路由守卫实现
 * 参考文档：https://www.bilibili.com/video/BV1iL4y1j75D/?vd_source=2806005ba784a40cae4906d632a64bd6
 * 三、vue路由钩子
 * 参考文档：https://blog.csdn.net/GXY1551705593/article/details/127415406
 *
 *
 *
 */
import { defineComponent, ref } from 'vue';
// 引入gsap库
import { gsap } from 'gsap';
// 导入样式
// import 'animate.css';
export default defineComponent({
  name: 'UsingGSAP',
  setup() {
    const flag = ref(true);
    /**
     *
     * @before-enter
     * @enter
     * @leave
     * 三个生命周期钩子对应的事件处理函数，结合gsap.set/gsap.to的用法，来描绘红色方块的点击显示和点击隐藏
     * 
     * 生命周期钩子+配合GSAP,弥补了直接通过生命周期钩子（TransitionLife.vue）来控制动画的缺点，可以通过生命周期
     * 钩子的处理函数+gsap，实现丝滑动画
     *
     */
    // transition生命周期钩子@before-enter对应
    const beforeEnter = (el: Element) => {
      // gsap.set()
      gsap.set(el, {
        width: 0,
        height: 0,
        opacity: 0
      });
    };
    // transition生命周期钩子@enter对应
    const enterActive = (el: Element, done: gsap.Callback) => {
      // gsap.to()
      gsap.to(el, {
        width: 100,
        height: 100,
        opacity: 1,
        onComplete: done
      });
    };
    // transition生命周期钩子@leave对应
    const leaveActive = (el: Element, done: gsap.Callback) => {
      gsap.to(el, {
        width: 0,
        height: 0,
        opacity: 0,
        onComplete: done
      });
    };
    return {
      flag,
      beforeEnter,
      enterActive,
      leaveActive
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
}
</style>
