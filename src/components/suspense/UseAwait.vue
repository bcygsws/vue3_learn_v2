<template>
  <div class="use_await">
    <p>await方式制作异步组件：{{ address }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
export default defineComponent({
  name: 'UseAwait',
  async setup() {
    // res.data整体拿到才是json数据，解构出:data
    const { data: data1 } = await axios.get('/data/address.json');
    console.log(data1); // {name: '雪无痕', address: '云荒', distance: 6666}
    return {
      address: data1.address
    };
  }
});
</script>
<style lang="scss" scoped>
.use_await {
  background-color: green;
}
</style>
