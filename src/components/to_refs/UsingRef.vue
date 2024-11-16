<template>
  <h3>八、ref的另外一个作用，获取标签元素</h3>
  <input type="text" name="" id="" ref="inputObj" />
</template>
<script lang="ts">
/**
 *
 * 前面说到ref，可以定义基本类型的响应式数据，其实现原理是vue2中响应式的原理，通过defineProperty(data,'count',{
 *    get,
 *    set
 * });来实现基本类型数据响应式的定义
 * ref的另外一个作用，获取标签元素对象(原生对象)
 * vue2 ref this.$refs
 * vue3 const myRef=ref() + 标签上绑定ref属性ref="myRef"
 *
 * react 16.3 以下，ref this.refs
 * react 16.3以上，myRef=React.createRef();
 * this.myRef.current 拿到标签元素对象
 *
 *
 */
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
  name: 'UsingRef',
  setup() {
    // 1.1 ref泛型是 HTMLElement | null 这种联合类型
    const inputObj = ref<HTMLElement | null>(null);
    // 1.2 在页面中获取焦点，时机肯定是组件完全挂载到页面以后，使用生命周期钩子onMounted
    // 1.3 同时体会vue3中生命周期钩子的使用方法，onMounted(cb),并且也放在setup函数中
    onMounted(() => {
      console.log(inputObj.value); // mounted阶段可以操作dom了，打印input这个对象：<input type="text" name id>
      // 判断一下，如果inputObj.value不是null(这个inputObj.value是ref对象中，操作时添加一个value,不是
      // 文本框中的内容那个value)，表明元素input渲染完成了，才可以调用focus()方法
      inputObj.value && inputObj.value.focus();
    });
    return { inputObj };
  }
});
</script>
