<template>
  <div class="main">
    <h3>7.使用transition-group实现随机数组</h3>
    <!-- lodash的shuffle([1,2,3,4]) 创建了一个打乱了的数组，可能是[2,3,4,1] -->
    <button @click="random">随机数组</button>
    <!-- tag属性可以，设置包裹的标签，多加一层 -->
    <!-- <transition-group tag="selection"> -->
    <!-- move-class过渡的类名 -->
    <transition-group move-class="random" tag="div" class="wraps">
      <div class="item" v-for="item in list" :key="item.id">
        {{ item.num }}
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
/**
 *
 * @ 使用 animate.css插件，实现左侧进入，右侧画出的动画
 *
 * cnpm i animate.css --save
 *
 * 主要是通过添加类名来实现
 * lodash插件的使用：
 * 注意：
 * 1.引用lodash时，需要在在 shims-vue.d.ts 文件夹下添加 declare module 'lodash'
 * 2.结合lodash官网，https://www.lodashjs.com/ ，使用他的属性和方法
 *
 */
import { defineComponent, ref } from 'vue';
// 引入动画插件
import 'animate.css';
// 引入lodash插件
import lodash from 'lodash';
export default defineComponent({
  name: 'RandomNum',
  setup() {
    const list = ref(
      /**
       * 
       * @ apply/call方法第一个参数传入null或者undefined时，js中this的指向是哪里？
       * 参考文档：https://www.cnblogs.com/memphis-f/p/12072915.html
       * 
       * 结论：apply/call方法的第一个参数是null(或者undefined)时，this指向JavaScript中的全局变量，在浏览器中就是
       * Window，在node.js环境中就是global
       * 
      */
      // Array.apply生成数组参考文档：http://www.javashuo.com/article/p-ehgnddrf-gn.html
      // Array.apply三种定义数组的方法：
      // Array.apply(null, { length: 81 } as number[]).map((item, index) => {
      // Array.apply(null, Array(81) as number[]).map((item, index) => {
      Array.apply(null, new Array(81) as number[]).map((item, index) => {
        return {
          id: index,
          // 周期性拿到1,2,3，……9
          num: (index % 9) + 1
        };
      })
    );
    console.log(list);
    const random = () => {
      // shuffle（洗牌，改换次序）将传入的数组内元素变换位置
      list.value = lodash.shuffle(list.value);
    };
    return {
      random,
      list
    };
  }
});
</script>
<style lang="scss" scoped>
.main {
  flex: 1;
  margin: 14px;
  border: 1px solid #ccc;
  overflow: auto;
  .random {
    /* property name | duration | timing function | delay */
    transition: all 1s ease;
  }
  .wraps {
    display: flex;
    flex-wrap: wrap;
    /* word-break 属性，默认值为normal;规定自动换行的处理方法:normal:使用浏览器的默认换行，break-all
    允许在单词内换行；keep-all允许在连字符或半角空格处换行 */
    word-break: break-all;
    border: 1px solid #ccc;
    width: calc(30px * 10);
    .item {
      border: 1px solid #333;
      width: 30px;
      height: 30px;
      text-align: center;
      font-size: 20;
    }
  }
}
</style>
