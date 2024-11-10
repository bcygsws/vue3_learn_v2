<template>
  <h3>十五、瞬移组件</h3>
  <button @click="openDia = true">点击按钮打开对话框</button>
  <!-- to还可以接收标签、还可以使用id选择器，比如：to="#wrapper" -->
  <Teleport to="body">
    <!-- 加上标签以后，这个组件ModalButton就干净地 瞬移 到了body中 -->
    <!-- 注意：v-if和v-show的区别：1.v-if有较大的切换渲染消耗，每次v-if的值改变都会触发生命周期狗子，内部是通过添加或删除
    dom元素来实现的；2.v-show有较大的初始渲染消耗，它是通过控制display的值none或者block来实现显示或隐藏的；在初次渲染时，
    必须完成全部的渲染，这会消耗更多的资源；初次加载页面自然会消耗更长的时间；在实际应用场景：要根据需要、页面加载时长和组件
  渲染的强度，做出合理的选择 -->
    <div class="modal" v-if="openDia">
      <div class="box">
        <p>这是一个对话框</p>
        <button @click="openDia = false">关闭对话框</button>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts">
/**
 *
 * @ 注意：如果Teleport 瞬移标签中to="body",
 * 该组件ModalButton要成为App的子组件时，按钮开始位于App的第一行，便于观察效果
 */
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'ModalButton',
  setup() {
    const openDia = ref(false);
    return {
      openDia
    };
  }
});
</script>
<style  lang="scss" scoped>
/* 注意：这种带灰色背景的html结构的书写方式*/
.modal {
  position: absolute;
  /* 绝对定位+4个方向上的偏移值为0 */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  .box {
    /*注意：flex布局中属性不用加单引号，多加了单引号，看不到效果  */
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 400px;
    background-color: #fff;
    /* 注意：当flex-direction设置为column时，y为主轴，当我们只要求它在水平方向居中时，x就是交叉轴；交叉轴的居中问题使用
    align-items:center; */
    align-items: center;
  }
}
</style>
