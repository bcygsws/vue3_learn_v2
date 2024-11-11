<template>
  <div class="son_container">
    <h4>我是Son子组件</h4>
    <!-- 键盘弹起事件，enter键,写法：@keyup.enter="" -->
    <input
      type="text"
      placeholder="请输入一段文本"
      v-model="txt"
      @keyup.enter="handleChange"
    />
    <!-- 加减法计数器 -->
    <br />
    <button @click="inc">+1</button>
    <button @click="dec">-1</button>
  </div>
</template>

<script lang="ts" setup>
// 使用setup语法糖
import { ref } from 'vue';
// 等价于原选项式API，props
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
});
// 文本框中输入的内容
const txt = ref('');
// 定义加减法使用的对象num
const num = ref(0);
/**
 *
 * @ v-model实现父组件向子组件传值时
 * 父组件 v-model:list=""
 *
 * 一、子组件 在使用emit分发事件，来改变父组件的list时要注意：
 * 1.1.为了见名知义，采用这样的格式进行事件命名：
 * 事件名称：update:list,格式：update:改变的属性名称；也可以使用其他字符串命名，只要在defineEmits中声明的字符串
 * 和emits('字符串名'，参数)一致即可
 * 1.2.defineEmits中拿到emits时，同步声明事件名称；例：const emits=defineEmits(['update:list']);
 * 1.3.分发事件时，emits('update:list',传参);
 *
 * 二、Vue3 defineEmits的使用详解
 * 2.1.结合子组件改变父组件值的计数器案例来体会
 * 参考文档：https://blog.csdn.net/weixin_47228574/article/details/128144067
 * 2.2.分发事件的名称可以自己定义，此处命名为 update:list是为了见名知义，表示分发的事件是为了更新list列表
 *
 */
/**
 * @ 所有分发事件必须声明在defineEmits(['分发事件1,分发事件2.……'])
 * 1.子组件改变父组件的数组元素，分发事件名：update:list1
 * 2.分发的加法事件：toFatInc
 * 3.分发减法的事件：toFatDec
 * 
 */
// 声明所有要分发的事件
// const emits = defineEmits(['xay']);
const emits = defineEmits(['update:list', 'toFatInc', 'toFatDec']);
// console.log(emits);

/**
 * @desc:文本框中，按下enter键
 * 键盘抬起事件-按enter按钮生效
 * @keyup.enter="handleChange"
 *
 * */
const handleChange = () => {
  const arr = props.list;
  // 新添加的数据，放在数组元素最前面，unshift方法（unshift 含义：数组头部插入）
  arr.unshift(txt.value);
  // update:props属性名，是固定写法，表示更新某个属性
  // 重要：子组件中按钮，改变父组件的列表；需要使用emits了，来将子组件中的arr数据分发到父组件中
  emits('update:list', arr);
  console.log(arr);
  // 分发事件完成后，清空文本框
  txt.value = '';
};
// 加、减法处理函数
const inc = () => {
  num.value += 1;
  emits('toFatInc', num.value);
};
const dec = () => {
  num.value -= 1;
  emits('toFatDec', num.value);
};
</script>
<style scoped lang="scss"></style>
