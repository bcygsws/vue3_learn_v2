<template>
  <div class="main">
    <h3>1.vue3中transition的使用</h3>
    <button @click="flag = !flag">点击按钮，切换动画</button>
    <!-- transition指定name属性后，过渡动画中的类v系列名称，变成fade-enter-from fade-enter-active等等 -->
    <transition name="fade">
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script lang="ts">
/**
 *
 * @一、transition中定义name属性（比如为：str）后，直接在style标签中书写
 * str-enter-from 
 * str-enter-active
 * str-enter-to
 * 等6种类样式即可
 * 
 * 注意：一这种方式，比方式2中定义enter-from-class、enter-active-class、
 *  enter-to-class、leave-from-class、
 * leave-active-class、leave-to-class更简洁
 * 
 * <transition name="fade">
 *  <div v-if="flag"></div>
 * </transition>
 * 
 * 进行某种操作，比如点击按钮后，flag由false变为true;则enter这三种类样式工作；
 * 同样的flag由true变成false时，则leave这三种类样式工作
 *
 * v-enter-from
 * v-enter-active
 * v-enter-to
 *
 * v-leave-from
 * v-leave-active
 * v-leave-to
 * 1.当在transition标签中，声明name属性后；需要在style标签中中定义
 * fade-enter-from、fade-enter-active、fade-enter-to和
 * fade-leave-from、fade-leave-active、fade-leave-to 
 * 这6种类样式
 *
 *
 */
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Transition',
  setup() {
    const flag = ref(true);
    return {
      flag
    };
  }
});
</script>
<style  lang="scss" scoped>
.main {
  flex: 1;
  margin: 14px;
  border: 1px solid #ccc;
  overflow: auto;
  .box {
    width: 100px;
    height: 100px;
    background-color: red;
  }
  /* 动画进入前的阶段 */
  .fade-enter-from {
    width: 0;
    height: 0;
    opacity: 0;
  }
  /* 动画进入的阶段 */
  .fade-enter-active {
    transition: all 2s ease;
  }
  .fade-enter-to {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
  /* 离开前 */
  .fade-leave-from {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
  /* 离开这个阶段 */
  .fade-leave-active {
    transition: all 2s ease;
  }
  /* 离开后 */
  .fade-leave-to {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
