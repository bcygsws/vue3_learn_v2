<template>
  <!-- 点击按钮，销毁Life组件，观察组件销毁的钩子 -->
  <br />
  <button @click="isShow">点击按钮，销毁Life组件</button>
  <Life v-if="flag"></Life>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Life from './Life.vue';
export default defineComponent({
  name: 'FatLife',
  components: {
    Life
  },
  setup() {
    let flag = ref(true);
    console.log(flag);
    function isShow() {
      flag.value = !flag.value;
    }
    return { flag, isShow };
  }
});
</script>
<style lang="scss" scoped></style>
