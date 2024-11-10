<template>
  <h3>
    七、toRefs将reactive包裹的对象，转换成普通对象，普通对象的每一个属性都是一个ref
  </h3>
  <!-- 不使用toRefs版本 -->
  <p>姓名：{{ info.name }}</p>
  <p>年龄：{{ info.age }}</p>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  name: 'ToRefs',
  setup() {
    const info = reactive({
      name: '张仲景',
      age: 78
    });
    return { info };
  }
});
/**
 * @ toRefs很重要
 * 作用：将一个reactive包裹的响应式对象转换成一个普通对象，普通对象的每一个属性都是一个ref
 * 使用场景：在自定义hook，或者在其他使用reactive包裹的对象数据的场合时，在不丢失其响应式的情况下，将对象进行分解使用
 *
 *
 *
 */
</script>
