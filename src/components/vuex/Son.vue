<template>
  <h4>这是Son子组件</h4>
  <p>{{ store.getters.getData }}</p>
  <p>{{ store.state.name }}</p>
  <button @click="addTwo(2)">+2</button>
  <button @click="reduceTwo(2)">-2</button>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex';
const store = useStore();
const addTwo = (step) => {
  // 通过mutations中的方法直接更改数据
  store.commit('inc', { step: step });
};
const reduceTwo = (step) => {
  store.dispatch('decAction', { step: step });
};
</script>
