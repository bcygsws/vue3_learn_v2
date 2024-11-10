<template>
  <div class="use_dynamicImp">
    <p>动态导入同步组件模拟异步效果：{{ msg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'UseAsyncCom',
  setup() {
    return {
      msg: 'abc'
    };
  }
});
</script>
<style lang="scss" scoped>
.use_dynamicImp {
  background-color: hotpink;
}
</style>
