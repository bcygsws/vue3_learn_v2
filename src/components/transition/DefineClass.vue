<template>
  <div class="def_container">
    <h4>2.自定义transition动画的类</h4>
    <button @click="flag = !flag">点击按钮，切换动画</button>
    <!-- transition指定name属性后，过渡动画中的类v系列名称，变成fade-enter-from fade-endter-active等等 -->
    <transition
      enter-from-class="ef_class"
      enter-active-class="ea_class"
      enter-to-class="et_class"
      leave-from-class="lf_class"
      leave-active-class="la_class"
      leave-to-class="lt_class"
    >
      <div v-if="flag" class="box"></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'DefineClass',
  setup() {
    const flag = ref(true);
    return {
      flag
    };
  }
});
</script>
<style lang="scss" scoped>
.def_container {
  flex: 1;
  border: 1px solid #ccc;
  margin: 10px;
  .box {
    width: 100px;
    height: 100px;
    background-color: blue;
  }
  /* 我们是监控box盒子的变化，所以那些动画类是box的类，层级和box同级，但是动画类：如：enter-from-class,enter-active-class要写在标签transition上 */
  /* 进入前 */
  .ef_class {
    width: 0;
    height: 0;
    opacity: 0;
  }
  /* 进入中阶段 */
  .ea_class {
    transition: all 2s ease;
  }
  .et_class {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
  .lf_class {
    width: 100px;
    height: 100px;
    opacity: 1;
  }
  /* 进入中阶段 */
  .la_class {
    transition: all 2s ease;
  }
  .lt_class {
    width: 0;
    height: 0;
    opacity: 0;
  }
}
</style>
