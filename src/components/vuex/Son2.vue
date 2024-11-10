<template>
  <h4>这是Son2子组件</h4>
  <p>{{ name }}</p>
  <p>{{ getData }}</p>
  <button @click="reduceTwo(2)">-2</button><br />
  <button @click="changeName('南宫烈')">更改非模块的state对象name值</button>
</template>
<script>
  import { defineComponent } from 'vue';
  import { useState } from '../../utils/useState';
  import { useGetters } from '../../utils/useGetters';
  import { useActions } from '../../utils/useActions';
  // 1.Son2是Son子组件的一份拷贝，这里准备采用封装在utils文件夹下的{useState,useGetters,useActions}来进行数据的读写
  // 2.modules下有模块，说明使用了命名空间，如果使用原本的数据，useState('',[]),useState第一个参数传入空字符串即可
export default defineComponent({
  name: 'Son2',
  setup() {
    // const storeState=useState('moduleA',['name']);
    // 使用原本的数据，而不是moduleA中的数据
    const storeState = useState('', ['name']);
    const storeGetters = useGetters('', ['getData']);
    // 将用到的action分别解构,分别使用decAction,setName
    const { decAction, setName } = useActions('', ['decAction', 'setName']);
    const reduceTwo = (step) => {
      decAction({ step: step });
    };
    const changeName = (val) => {
      setName(val);
    };
    return {
      ...storeState,
      ...storeGetters,
      reduceTwo,
      changeName
    };
  }
});
</script>
