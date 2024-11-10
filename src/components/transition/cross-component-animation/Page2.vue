<template>
  <div class="page2_container">
    <div class="box Page2">page2</div>
  </div>
</template>
<script>
import { gsap } from 'gsap';
// import 'animate.css';
import { ref, onMounted } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
export default {
  name: 'Page2',
  setup() {
    const route = useRoute();
    // x: 盒子距离父组件的原点横坐标，y:盒子距离父组件的原点纵坐标，
    // color颜色，scale:放大特效，rotate：旋转特效
    const toX = ref(200);
    const toY = ref(200);
    const toBackground = ref('green');
    const toScale = ref(1.2);
    const toRotation = ref(90);
    // 路由离开导航守卫
    onBeforeRouteLeave((to) => {
      // 如果离开Page2组件，组件要进入Page1组件
      // if (to.path == '/home/transition/cross_component_animation/page1') {
      if (to.name == 'Page1') {
        to.query = {
          x: toX.value,
          y: toY.value,
          color: toBackground.value,
          scale: toScale.value,
          rotation: toRotation.value
        };
      }
    });
    // onMounted钩子
    onMounted(() => {
      // 如果没有传入值，则使用默认定义的x,y,background,scale,rotation值
      gsap.fromTo(
        '.Page2',
        {
          x: route.query.x,
          y: route.query.y,
          background: route.query.color,
          scale: route.query.scale,
          rotation: route.query.rotation
        },
        {
          x: toX.value,
          y: toY.value,
          background: toBackground.value,
          scale: toScale.value,
          rotation: toRotation.value,
          // 动画持续时间（默认单位为秒），需要设置，设置为1s
          duration: 1
        }
      );
    });
    return { toX, toY, route };
  }
};
</script>
<style lang="scss" scoped>
.page2_container {
  .box {
    width: 100px;
    height: 100px;
  }
}
</style>
