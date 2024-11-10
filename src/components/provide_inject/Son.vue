<template>
  <div>
    <h4>Son子组件</h4>
    <GrandSon></GrandSon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GrandSon from './GrandSon.vue';
export default defineComponent({
  name: 'Son',
  components: {
    GrandSon
  }
});
</script>
<style lang="scss" scoped></style>
