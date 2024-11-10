<template>
  <div>
    <h3>二十、attrs实现组件通信</h3>
    <AttrsSon
      :title="title"
      :bool="bool"
      msg="我是父组件绑定的数据"
      :changeData="changeData"
      @changeBool="changeBool"
    ></AttrsSon>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
// 导入子组件AttrsSon
import AttrsSon from './AttrsSon.vue';
const title = ref('空桑');
const bool = ref<boolean | string>(false);
const changeData = () => {
  title.value += '==';
};
const changeBool = (val: boolean | string) => {
  bool.value = val;
};
</script>
<style scoped lang="scss"></style>
