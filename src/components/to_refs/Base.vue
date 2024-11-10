<template>
  <to-refs></to-refs>
  <to-refs1></to-refs1>
  <using-ref></using-ref>
  <under-to-ref></under-to-ref>
</template>

<script lang="ts">
  /**
   * 
   * @ to_refs分支
   * 在About组件的子路由Base组件
   * 
   * 
  */
import { defineComponent } from 'vue';
import ToRefs from './ToRefs.vue';
import ToRefs1 from './ToRefs1.vue';
import UsingRef from './UsingRef.vue';
import UnderToRef from './UnderToRef.vue'
export default defineComponent({
  name: 'Base',
  components: {
    ToRefs,
    ToRefs1,
    UsingRef,
    UnderToRef
  }
});
</script>
<style lang="scss" scoped></style>
