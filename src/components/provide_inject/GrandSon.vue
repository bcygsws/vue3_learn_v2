<template>
  <div>
    <h5>孙子组件GrandSon</h5>
    <!-- 祖父传过来的数据 ,模板中color相当于color.value了-->
    <p :style="{ color: color }">颜色：{{ color }}</p>
  </div>
</template>

<script lang="ts">
// import {defineComponent, inject} from 'vue';
// import {colorKey} from "@/types/inject-types.ts";

/**
 *
 * @provide/inject类型丢失
 * 参考文档：https://blog.csdn.net/qq_52395343/article/details/129752775
 * 场景：provide传递的是ref，inject('color1')接收的同样是Ref<any>才对，但是将鼠标放在inject()接收值上，提示类型是
 * unknown类型
 * 解决：使用vue3提供的InjectionKey，将provide的key作为参数传进去，这样在inject中，可以得到对应的类型
 *
 * 在祖父级组件中，更改数据时，孙子组件模板中数据改变，页面更新；但是，setup只是在孙子组件初次渲染时，执行了一次
 *
 */


// export default defineComponent({
//   name: 'GrandSon',
//   setup() {
//     // 为color添加类型注解，避免模板中:style报错
//     // const color = inject('color1');
//
//     const color = inject(colorKey);// color的类型不再是unknown,而是Ref<string, string> | undefined
//     console.log(color); // 打印发现inject后的color是一个Ref对象
//     console.log(color?.value);
//     return {
//       color
//     };
//   }
// });
</script>

<script lang="ts" setup>
import {inject} from "vue";
import {colorKey} from "@/types/inject-types.ts";

/**
 * vue3使用setup标签后，定义name属性的方法
 * 参考文档1：https://www.jb51.net/article/250641.htm
 * 方式一：安装插件：unplugin-vue-define-options
 * npm install unplugin-vue-define-options --save
 *
 * 方式二：多写一对script标签，在里面写export default {name:'GrandSon'}
 *
 * 方式三：使用vite扩展插件：vite-plugin-vue-setup-extend
 * 参考文档2：https://blog.csdn.net/m0_62719309/article/details/126463317
 *
 * 方式四：vue3.3版本以后，vue包里包含了，defineOptions()，无需导入，可以直接使用
 *
 *
 *
 * */
defineOptions({
  name: 'GrandSon'
})

const color = inject(colorKey);// color的类型不再是unknown,而是Ref<string, string> | undefined
console.log(color); // 打印发现inject后的color是一个Ref对象
console.log(color?.value);
</script>
<style lang="scss" scoped></style>
