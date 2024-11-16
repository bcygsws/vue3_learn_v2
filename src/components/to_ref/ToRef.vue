<template>
  <h3>十二、演示toRef的用法</h3>
  <!-- 原响应式数据源是否变化,观察toRef和ref的不同点 -->
  <p>年龄：{{ state.age }}</p>
  <p>金钱：{{ state.money }}</p>
  <hr />
  <p>年龄：{{ age }}</p>
  <p>金钱：{{ money }}</p>
  <button @click="update">更新数据，观察数据变化</button>
  <Son :age="age" :money="money"></Son>
</template>
<script lang="ts">
import { defineComponent, reactive, toRef, ref } from 'vue';
import Son from './Son.vue';
/**
 *
 * @desc:toRef(state,money)和ref(state.money)的区别：
 * toRef:为源响应式对象上的某个属性创建了一个ref对象，二者同步操作的是同一数值，同步更新
 * 语法：const age=toRef(state,'age');和解构toRefs(state)拿到age是一个意思
 *
 * ref相当于把原来的对象的属性做了一份拷贝，操作时和原来的数据之间互不影响
 *
 *
 */
export default defineComponent({
  name: 'ToRef',
  components: {
    Son
  },
  setup() {
    const state = reactive({
      age: 1,
      money: 2000
    });
    // 使用toRef拿到age属性，返回一个ref
    const age = toRef(state, 'age');
    console.log(age); // ObjectRefImpl
    // 注意：把响应式数据对象中某个属性用ref包装,根据state.money的初始值，创建了一个全新的ref，
    // state.money模版中的数据就不会再改变了
    const money = ref(state.money);
    console.log(money);// RefImpl
    const update = () => {
      // {{state.age}}和{{age}}中的数据都改变了
      age.value += 1;
      // 原来state中的money结果不变，仅仅{{money}}改变
      money.value += 10;
      console.log('测试是否执行');
    };
    return {
      age,
      money,
      state,
      update
    };
  }
});
</script>
