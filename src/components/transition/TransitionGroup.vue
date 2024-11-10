<template>
  <div class="main">
    <h3>6.使用transition-group实现动画</h3>
    <button @click="addItem">添加一条数据</button>
    <button @click="delItem">删除一条数据</button>
    <!-- tag属性可以，设置包裹的标签，多加一层 -->
    <!-- <transition-group tag="selection"> -->
    <div class="wraps">
      <!-- animate_backInLeft从左侧背景里面进入，animate__InRight从右侧背景里进入 -->
      <transition-group
        enter-active-class="animate__animated animate__backInLeft"
        leave-active-class="animate__animated animate__backOutRight"
      >
        <div class="item" v-for="(item, index) in arr" :key="index">
          {{ item }}
        </div>
      </transition-group>
    </div>
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
 *
 */
import { defineComponent, reactive } from 'vue';
// 引入动画插件
import 'animate.css';
export default defineComponent({
  name: 'TransitionGroup',
  setup() {
    const arr = reactive<number[]>([1, 2, 3, 4]);
    const addItem = () => {
      // push(arr.length+1)，实际就是在数组的（索引+1）的位置逐个添加正整数
      arr.push(arr.length + 1);
    };
    const delItem = () => {
      arr.pop();
    };
    return {
      addItem,
      delItem,
      arr
    };
  }
});
</script>
<style lang="scss" scoped>
.main {
  flex: 1;
  margin: 8.454rpx;
  border: 0.604rpx solid #ccc;
  overflow: hidden;
  .wraps {
    display: flex;
    flex-wrap: wrap;
    /* word-break 属性，默认值为normal;规定自动换行的处理方法:normal:使用浏览器的默认换行，break-all
    允许在单词内换行；keep-all允许在连字符或半角空格处换行 */
    word-break: break-all;
    border: 1px solid #ccc;
    .item {
      margin-right: 20px;
      font-size: 40;
    }
  }
}
</style>
