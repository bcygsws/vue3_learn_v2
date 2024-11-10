<template>
  <div class="main">
    <h3>8.使用gsap和watch监听</h3>
    <input type="text" v-model="curNum" placeholder="请输入一个整数" />
    <!-- 数值.toFixed(n)保留n位小数，四舍五入 -->
    <!-- parseInt(只能前面就是数字的字符) -->
    输入数字改变过度效果:
    {{ tweenedNumber ? parseInt(tweenedNumber).toFixed(0) : '' }}<br />
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
 *
 *
 */
import { defineComponent, reactive, watch, toRefs } from 'vue';
// 引入gsap
import gsap from 'gsap';
type Num = {
  curNum: string;
  tweenedNumber: string;
};
export default defineComponent({
  name: 'RandomNum',
  setup() {
    const num = reactive<Num>({
      curNum: '',
      tweenedNumber: ''
    });
    // num 数字状态num的过渡
    // curNum 输入框监听的值
    // tweenedNumber 状态过度的值，数字的抖动值
    // curNum影响 tweenedNumber
    watch(
      () => num.curNum,
      (newV) => {
        console.log('newV', newV);
        // 输入非数字时，弹出警告
        // 正整数的正则表达式
        // 一、程序严谨
        // const reg = /^(0|[1-9][0-9]*)$/;
        // if (!reg.test(newV)) {
        //   alert('你输入的是非数字');
        // } else {
        //   gsap.to(num, {
        //     duration: 1,
        //     tweenedNumber: newV
        //   });
        // }

        // gsap.to duration:1设置后，类似transition：all 1s ease;即：在1s内，tweenedNumber被最终设置为newV的最新值
        gsap.to(num, {
          duration: 1,
          tweenedNumber: newV
        });
      }
    );
    return {
      ...toRefs(num)
    };
  }
});
</script>
<style lang="scss"scoped>
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
