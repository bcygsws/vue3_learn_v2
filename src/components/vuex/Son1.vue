<template>
  <h4>这是Son1子组件</h4>
  <div>
    姓名：<span>{{ name }}</span
    ><br />
    mapGetters方式获得姓名：<span>{{ getName }}</span
    ><br />
    <br />年龄：<span>{{ age }}</span
    ><br />性别：<span>{{ sex }}</span>
    <br />
    <button @click="changeName">更改姓名</button>
    <br />
    <button @click="changeDefaultSpaceData">
      点击按钮，提交更改根空间的数据
    </button>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
// 引入封装的useState文件
import { useState } from '../../utils/useState';
import { useActions } from '../../utils/useActions';
import { useGetters } from '../../utils/useGetters';
import { useMutations } from '../../utils/useMutations';
/**
 * @ vue3中使用映射模板，要进行一定的封装
 * 封装思路见文档：https://blog.csdn.net/qq_16139383/article/details/119935755?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_antiscanv2&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_antiscanv2&utm_relevant_index=1
 *
 *
 */
export default defineComponent({
  setup() {
    // 没有使用命名空间的，useState,useGetters,useActions第一个参数传入一个空字符串就可以了
    const storeState = useState('moduleA', ['name', 'age', 'sex']);
    const storeGetters = useGetters('moduleA', ['getName']);
    const storeActions = useActions('moduleA', ['setName']);
    const storeMutations = useMutations('', ['remendName']);
    const changeName = () => {
      storeActions.setName('李四');
    };
    // 相当于在命名空间的moduleA中，更改了根空间的数据
    // 当然也可以在moduleA的actions的context参数，设置整体的更改，因为context可以就 解构成六大对象
    // {state,commit,dispatch,getters,rootState,rootGetters}
    // 参考文档：https://blog.csdn.net/lzb348110175/article/details/89387495?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&utm_relevant_index=1
    const changeDefaultSpaceData = () => {
      storeMutations.remendName('庾信平生最萧瑟，暮年诗赋动江关');
    };
    return {
      ...storeState, // 短路运算符，解构对象，方便在模板中使用，且解构出来的属性响应式没有丢失
      ...storeGetters,
      changeName,
      changeDefaultSpaceData
    };
  }
});
</script>
