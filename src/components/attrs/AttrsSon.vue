<template>
  <div>
    <h5>这是AttrsSon子组件</h5>
    <p>{{ title }}</p>
    <p>{{ bool }}</p>
    <!-- attrs中绑定的属性值通常是不需要改变的，没有使用toRefs解构 -->
    <p>{{ attrs.msg }}</p>
    <!-- 子组件中更改title值 -->
    <button @click="handleChange">子组件中更改title</button>
    <button @click="handle">子组件中更改bool</button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, useAttrs, toRefs, defineEmits } from 'vue';
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  bool: {
    type: Boolean,
    required: true
  },
  changeData: {
    type: Function,
    required: true
  }
});
console.log(props.title);
console.log(props.bool);
const { title, bool } = toRefs(props);
const attrs = useAttrs();
console.log(attrs); // Proxy {msg:"我是父组件绑定的数据",v_internal:1}
// 按钮的事件处理函数
const handleChange = () => {
  props.changeData();
};
const emit = defineEmits(['changeBool']);
const handle = () => {
  emit('changeBool', '好吗？');
};
</script>
<style scoped lang="scss"></style>
