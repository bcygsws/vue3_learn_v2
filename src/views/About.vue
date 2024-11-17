<template>
  <div class="about">
    <h3>About组件</h3>
    <br/>
    <router-link to="/about/fat_life"
    >五、vue2和vue3生命周期钩子的对比
    </router-link
    >
    <router-link to="/about/hook">六、自定义hook的演示</router-link>
    <router-link to="/about/to_refs"
    >七、在不丢失reactive对象的响应式基础上，分解对象，对象每个属性都是一个ref
    </router-link
    >
    <!--八、新组件之瞬移组件-->
    <router-link to="/about/teleport">十五、使用新组件之瞬移组件teleport</router-link>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'About'
})
</script>
