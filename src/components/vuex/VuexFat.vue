<template>
  <h4>这是VuexFat父组件-演示vuex通信</h4>
  <p>{{ store.state.count }}</p>
  <!-- 响应式监听一下count -->
  <p>{{ count }}</p>
  <p>{{ store.getters.getData }}</p>
  <button @click="add(1)">+1</button>
  <button @click="reduce(1)">-1</button>
  <hr/>
  <Son></Son>
  <hr/>
  <Son1></Son1>
  <hr/>
  <Son2></Son2>
</template>
<script lang="ts" setup>
import {useStore} from 'vuex';
import {computed} from 'vue';
// 导入子组件Son
import Son from './Son.vue';
// 导入子组件Son1
import Son1 from './Son1.vue';
import Son2 from './Son2.vue';

const store = useStore();
const count = computed(() => {
  // 类似在vue2中，使用映射模板；computed:{...mapState(['count']) }
  return store.state.count;
});
const add = (step: number) => {
  store.commit('inc', {step: step});
};
const reduce = (step: number) => {
  // mutations的方式，直接更改数据
  // store.commit('dec', { step: step });
  // 使用actions间接更改数据
  store.dispatch('decAction', {step: step});
};
</script>
