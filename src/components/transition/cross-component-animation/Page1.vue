<template>
  <div class="page1_container">
    <div class="box Page1">page1</div>
  </div>
</template>
<script lang="ts">
/**
 *
 * @ gsap+路由守卫实现，跨组件动画
 * 1.安装gsap
 *
 * 2.在组件中引入gsap：
 * import {gsap} from 'gsap';
 *
 * 3.gsap的常用API的方法
 * a. gsap.set(类选择器,{})
 * b. gsap.to(类选择器，{})
 * c. gsap.fromTo(类选择器,
 *   {    },
 *   {   }
 *   )
 *
 *
 */
import { gsap } from 'gsap';
// import 'animate.css';
import { ref, onMounted } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
export default {
  name: 'Page1',
  setup() {
    // useRoute()类似拿到了vue2中this.$route这个对象
    // 参考文档：https://juejin.cn/post/7006289875674595365
    const route = useRoute();
    // x：距离父组件原点的横坐标，y:距离父组件的原点纵坐标，color颜色，scale:放大特效，rotate：旋转特效
    const x = ref(100);
    const y = ref(100);
    const background = ref('red');
    const scale = ref(1);
    const rotation = ref(0);
    // 路由离开导航守卫，to,from参数都是route类型的对象，具有path,name,params,query,hash等一系列属性
    onBeforeRouteLeave((to) => {
      // 如果离开Page1组件，组件要进入Page2组件
      // if (to.path == '/home/transition/cross_component_animation/page2') {
      if (to.name == 'Page2') {
        to.query = {
          x: x.value,
          y: y.value,
          color: background.value,
          scale: scale.value,
          rotation: rotation.value
        };
      }
    });
    // onMounted钩子
    onMounted(() => {
      // 如果没有传入值，则使用默认定义的x,y,background,scale,rotation值
      if (!route.query.x) {
        gsap.set('.Page1', {
          x: x.value,
          y: y.value,
          background: background.value,
          scale: scale.value,
          rotation: rotation.value
        });
        return;
      }
      // 如果传入值，则使用gsap的fromTo动画，x,y,background,scale,rotation值
      // x：距离父组件原点的横坐标，y:距离父组件的原点纵坐标，color颜色，scale:放大特效，rotate：旋转特效
      if (route.query.x) {
        gsap.fromTo(
          '.Page1',
          {
            x: route.query.x,
            y: route.query.y,
            background: route.query.color,
            scale: route.query.scale,
            rotation: route.query.rotation
          },
          // 动画持续时间（默认单位为秒），需要设置，设置为1s
          {
            x: x.value,
            y: y.value,
            background: background.value,
            scale: scale.value,
            rotation: rotation.value,
            duration: 1
          }
        );
      }
    });

    return { x, y, route };
  }
};
</script>
<style lang="scss" scoped>
.page1_container {
  .box {
    width: 100px;
    height: 100px;
  }
}
</style>
