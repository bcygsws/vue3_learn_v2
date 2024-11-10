<template>
  <div>
    <!-- transition动画的几种方式 -->
    <router-link to="/home/transition/tr_name"
      >1.使用transition的name属性更改默认类</router-link
    >
    <router-link to="/home/transition/define_class"
      >2.自定义动画类名</router-link
    >
    <router-link to="/home/transition/life"
      >3.transition的生命周期钩子</router-link
    >
    <router-link to="/home/transition/use_gsap"
      >4.使用gsap库实现丝滑动画</router-link
    >
    <router-link to="/home/transition/use_animate"
      >5.单独使用animate.css实现动画</router-link
    >
    <router-link to="/home/transition/tr_group"
      >6.使用transition-group实现动画</router-link
    >
    <router-link to="/home/transition/random_num"
      >7.使用transition-group实现81宫格随机数字</router-link
    >
    <router-link to="/home/transition/gsap_watch"
      >8.gsap配合watch监听</router-link
    >
    <router-link to="/home/transition/cross_component_animation"
      >9.路由守卫+gsap实现跨组件动画</router-link
    >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SomeWay'
});
</script>
<style lang="scss" scoped></style>
