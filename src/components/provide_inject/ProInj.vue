<template>
  <h3>十四、provide/inject组孙组件传值</h3>
  <p :style="{ color: color }">当前颜色：{{ color }}</p>
  <button @click="color = 'yellow'">黄色</button>
  <button @click="color = 'blue'">蓝色</button>
  <button @click="color = 'pink'">粉色</button>
  <Son></Son>
</template>

<script lang="ts">
/**
 *
 * @provide/inject在vue2.x中也有，只不过在vue2中默认设置为非响应式的
 * vue3中provide/inject是响应式的，且使用很简单
 * 在提供出provide("标识",数据)
 * 在接收处，const data=inject("标识");// data是一个响应式对象，在setup中data.value可以拿到值
 *
 * 了解几个判别对象的方法
 * isRef 判断是否为ref创建的对象
 * isReactive 判断是否是reactive创建的响应式代理
 * isReadonly 判断是否是readonly创建的只读代理
 * isProxy 检查一个对象是否是reactive和readonly创建的只读代理
 *
 */
import {
  defineComponent,
  ref,
  reactive,
  readonly,
  provide,
  isRef,
  isReactive,
  isReadonly,
  isProxy
} from 'vue';
// 引入儿子组件
import Son from './Son.vue';
import {colorKey} from "@/types/inject-types.ts";

export default defineComponent({
  name: 'ProInj',
  setup() {
    console.log('1-开始创建组件-setup');
    const color = ref('red');

    // provide('color1', color);
    // 注：为了解决inject接收时的类型丢失，使用vue提供InjectionKey定义provide/inject传递的标识符
    provide(colorKey, color);
    console.log(isRef(ref({}))); // true
    console.log(isReactive(reactive({}))); // true
    console.log(isReadonly(readonly({}))); // true
    console.log(isProxy(reactive({}))); // true
    console.log(isProxy(readonly({}))); // true
    console.log(isProxy(ref({}))); //  false
    return {
      color
    };
  },
  components: {
    Son
  }
});
</script>
<style lang="scss" scoped></style>
