<template>
  <modal-button></modal-button>
  <div id="nav">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>
<script lang="ts" setup>
// 导入ModalButton组件
import ModalButton from './components/teleport/ModalButton.vue';

defineOptions({
  name: 'App'
})
</script>
<style lang="scss" scoped>
#nav {
  padding: 30px;
  text-align: center;


  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 30px;

    /*定义路由选中时的样式*/
    &.router-link-exact-active {
      color: #42b983;
    }
  }

}


</style>
