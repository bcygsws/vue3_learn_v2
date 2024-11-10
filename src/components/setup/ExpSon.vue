<template>
  <h5>体会expose语法糖-父组件ExpSon</h5>
  <p>{{ count }}</p>
  <hr />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup(props, { expose }) {
    const count = ref(0);
    const toDo = () => {
      console.log('子组件ExpSon中方法toDo');
    };
    // 暴露的属性为count对象expose({count});注意：expose里面是大括号对象，包括一个对象count
    expose({ count, toDo });
    return {
      count
    };
  }
});
</script>
