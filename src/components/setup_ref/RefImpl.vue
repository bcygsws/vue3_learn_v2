<template>
  <div class="refimpl_container">
    <h3>演示ref(obj)和reactive(obj)在watch侦听上的区别</h3>
    <p>sum的值：{{ sum }}</p>
    <button @click="inc">点击按钮，sum值+1</button>
    <dl>
      <dt>名字：{{ res.name }}</dt>
      <dd>年龄：{{ res.age }}</dd>
      <dd>技能：{{ res.skills }}</dd>
    </dl>
    <!-- click一个按钮，改变skills数组的值 -->
    <button @click="changeSkill">点击按钮，改变res对象的skills键的值</button>
    <dl>
      <dt>名字：{{ rea.name }}</dt>
      <dd>年龄：{{ rea.age }}</dd>
      <dd>技能：{{ rea.skills }}</dd>
    </dl>
    <!-- click一个按钮，改变skills数组的值 -->
    <button @click="MyChangeSkill">点击按钮，改变rea对象的skills键的值</button>
  </div>
</template>
<script lang="ts">
import {ref, watch, reactive} from 'vue';

/**
 *
 * @desc:ref和reactive对象，在watch中监听时，不同情况下被监听对象的写法
 * 参考文档：vue3Watch监听RefImpl对象的说明
 * 文档链接：https://blog.csdn.net/moxunjinmu/article/details/123320567
 * 1.watch监听simpleRef ref(简单类型)，直接将对象本身作为监听对象，不带.value，否则报错
 * 注：watch的监听对象只能为getter/setter ref reactive对象和数组（前面几种数据源构成的数组，这是watch监听多个数据源的情形），
 * 不能是简单类型
 *
 * 2.watch监听comRef ref(复杂类型{})
 * 注：两种处理方式：
 * 2.1 将comRef直接作为监听对象，此时watch需要配置为{deep:true}，否则watch监听的回调内代码不会执行
 * 2.2 将res.value作为监听对象，因为ref({})对象时，vue3内部会调用reactive方法，将proxy对象挂载在RefImpl对象的value属性上
 *
 * 3.watch监听rea reactive({})，直接将对象本身作为监听对象
 *
 * 4.watch监听 rea reactive({a:'',b:''}) reactive对象的单个属性,需要使用函数形式监听
 * watch(()=>rea.a, (newVal, oldVal)=>{
 *  // todo
 * })
 *
 *
 *
 */
export default {
  name: 'RefImpl',
  setup() {
    let sum = ref(0);
    // 注意：对象在Vue3中，一般使用reactive来定义；当使用ref来包括对象时，对象仍然能够深度响应式；RefImpl把代理对象Proxy挂在自己的value属性上
    // 对比：ref和reactive定义对象后，在watch监听时的区别
    let res = ref({
      name: '张无忌',
      age: 20,
      skills: ['太极拳', '九阳神功', '乾坤大挪移']
    });

    let rea = reactive({
      name: '张翠山',
      age: 45,
      skills: ['武当剑法', '七伤拳']
    });
    // a.sum本身就是一个RefImpl，直接作为北watch监听的对象;而sum.value是一个具体值，不能作为watch的监听对象
    /*
    注意：如果监听了sum.value,不能打印sum值的；而且会弹出警告：watch监控数据源只能是：getter/setter函数，ref,reactive对象，或者前面
    几种数据源构成的数组（watch监听多个数据源时）
    不包括 数值型 
    [Vue warn]: Invalid watch source:  0 A watch source can only be a getter/effect function,
     a ref, a reactive object, or an array of these types. 
    */
    // watch(sum.value, (newVal, oldVal) => {
    watch(sum, (newVal, oldVal) => {
      // 打印出来，sum是一个RefImpl对象；newVal值为模板中显示的新值
      console.log(sum, newVal, oldVal);
    });
    // 为ref传入对象时，vue3内部会调用reactive方法；将Proxy代理对象赋值给RefImpl对象（Proxy挂在RefImpl对象的value属性上）
    // 等效方案:ref中传入对象时，仍然将对象本身当做监听对象，此时需要使用第三个参数，设置为深度监听{deep:true}
    // a.将res.value作为被监听对象
    // watch(res.value, (newVal, oldVal) => {
    //   console.log(res.value, newVal.skills, oldVal.skills);
    // });
    // b.ref中传入对象；仍然将ref对象本身作为被监听变量;不佳深度监听，watch的处理函数不执行
    watch(
        res,
        (newVal, oldVal) => {
          console.log(res.value, newVal.skills, oldVal.skills);
        },
        {deep: true}
    );
    // c.rea本身就是对象传入了reactive，rea本身就可以作为监听对象---在上面[Vue Warn]中可以看到哪些数据能作为警告
    watch(rea, (newVal, oldVal) => {
      console.log(rea, newVal.skills, oldVal.skills);
    });
    const inc = () => {
      sum.value += 1;
    };
    const changeSkill = () => {
      res.value.skills[0] += '*';
    };
    const MyChangeSkill = () => {
      // rea是Proxy对象，直接使用reactive定义的；所以rea不需要带value
      rea.skills[0] += '&';
    };
    return {
      sum,
      inc,
      res,
      changeSkill,
      rea,
      MyChangeSkill
    };
  }
};
</script>
