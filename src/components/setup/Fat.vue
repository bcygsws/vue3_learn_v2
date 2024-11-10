/**书写ts的文件中，切换成vue文件 */
<template>
  <div>
    <h2>四、Fat组件，演示setup的执行时机</h2>
    <!-- setup中数据渲染 -->
    <p>{{ msg }}</p>
    <button @click="handle">更新数据</button>
    <!-- msg里的数据传递给子组件 -->
    <!-- 在Son子组件中，点击按钮分发事件 -->
    <Son :cmsg="msg" msg2="真香啊" @emitxx="handleEvent">
      <!-- 1.放入子组件中的插件模板v-slot:slot1,v-slot:slot2 -->
      <!-- 2.其他用处：vue3 新组件Suspense就是通过作用域插槽实现的v-slot:default放后来显示的，v-slot:fallback放后备内容 -->
      <!-- <template v-slot:slot1> -->
      <template v-slot:slot1>
        <p>桃李春风一杯酒，江湖夜雨十年灯</p>
      </template>
      <!-- <template v-slot:slot2> -->
      <template v-slot:slot2>
        <p>永忆江湖归白发，欲回天地入扁舟</p>
      </template>
    </Son>
    <!-- 演示ref和reactive的细节 -->
    <Detail></Detail>
    <!-- 演示context解构出的expose语法糖 -->
    <ExpFat></ExpFat>
  </div>
</template>
<script lang="ts">
// 一 、setup的执行时机
import { defineComponent, ref } from 'vue';
import Son from './Son.vue';
import Detail from './Detail.vue';
import ExpFat from './ExpFat.vue';
export default defineComponent({
  name: 'Fat',
  // 解决传入组件的属性不能自动继承的警告
  // emits: ['msg2'],
  // 注册组件
  components: {
    Son,
    Detail,
    ExpFat
  },
  setup() {
    // msg这个目标对象（代理对象），是引用类型；栈中存储对象的地址，堆中存放对象的键值；此时键值变化，是可以使用const关键字声明的
    const msg = ref('what are you nong sha lei');
    const handle = () => {
      // 点击按钮更新数据
      msg.value += '***';
    };
    // 子组件Son分发的事件名称，emitxxx,传递的参数'***'
    const handleEvent = (val: string) => {
      msg.value += val;
    };
    return {
      msg,
      handle,
      handleEvent
    };
  }
});
</script>
