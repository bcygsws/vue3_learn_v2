<template>
  <div class="cross_container">
    <h3>9.gsap+路由守卫实现跨组件动画</h3>
    <div class="bar">
      <router-link :to="{ name: 'Page1' }">Page1</router-link>
      <router-link :to="{ name: 'Page2' }">Page2</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script lang="ts" setup>
/**
 * 跨组件动画的实现
 * gsap+路由守卫
 *
 * 参考文档：https://github.com/baobaomi900901/cross-component-animation
 * 参考文档1：https://www.seozhh.com/15024.html
 * 参考文档2：http://www.taodudu.cc/news/show-1774783.html?action=onClick
 *
 *
 *
 */
</script>
<style lang="scss" scoped>
.cross_container {
  .bar {
    width: 100%;
    height: 50px;
    background-color: pink;
    /* 该属性让.bar成为flex container */
    display: flex;

    > a {
      flex: 1;
      height: 50px;
      line-height: 50px;
      display: block;
      margin: 0 30px;
      text-decoration: none;
      color: #111;
      justify-content: space-between;
    }

    > a.exact_active {
      color: red;
    }
  }
}
</style>
