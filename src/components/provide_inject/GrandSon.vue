<template>
  <div>
    <h5>孙子组件GrandSon</h5>
    <!-- 祖父传过来的数据 ,模板中color相当于color.value了-->
    <p :style="{ color: color }">颜色：{{ color }}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue';

/**
 *
 * @ provide传递的是ref
 * inject('color1')接收的同样是Ref
 *
 * 在祖父级组件中，更改数据时，孙子组件模板中数据改变，页面更新；但是，setup只是在孙子组件初次渲染时，执行了一次
 *
 */
export default defineComponent({
  name: 'GrandSon',
  setup() {
    // 为color添加类型注解，避免模板中:style报错
    const color = inject('color1');
    console.log(color); // 打印发现inject后的color是一个Ref对象
    console.log(color.value);
    return {
      color
    };
  }
});
</script>
<style lang="scss" scoped></style>
