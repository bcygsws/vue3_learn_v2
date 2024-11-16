<template>
  <h3>六、自定义钩子-即vue2中的混入技术</h3>
  <p>点击处坐标：({{ x }},{{ y }})</p>
  <!-- 模板渲染请求数据的过程 -->
  <p v-if="loading">数据加载中……</p>
  <!-- errorMsg只要不是空字符串就是true -->
  <p v-else-if="errorMsg">{{ errorMsg }}</p>
  <ul v-else>
    <li>姓名：{{ data?.name }}</li>
    <li>地址：{{ data?.address }}</li>
    <li>距离：{{ data?.distance }}</li>
  </ul>
  <ul v-for="item in data1" :key="item.id">
    <li>id:{{ item.id }}</li>
    <li>title:{{ item.title }}</li>
    <li>price:{{ item.price }}</li>
  </ul>
</template>
<script lang="ts">
/**
 *
 * @desc:vue3中的自定义钩子，类似vue2中的混入技术
 * vue2中混入技术：用途是分发复用代码，提高了代码的灵活性
 * 概念：组件实例mixins属性接收一个混入对象的实例，mixins:['混入对象mixin'],混入对象的属性和方法会被合并到组件中
 *
 * 混入技术-合并原则：
 * 1.组件和混入对象的data数据对象，会被递归合并，遇到键名冲突时，以组件实例为主
 * 2.生命周期钩子和合并成数组，混入对象和组件实例中的钩子都会执行，而且混入对象的钩子在当前实例钩子执行
 * 3.值为对象的属性，如：methods、components、directives内的属性会被合并成一个对象。遇到键名冲突时，以当前组件为准
 * 注意：this.$data可以获取选项式API和混入对象mixins中的data数据，并按照原则中的第一条进行合并
 *
 * https://cn.vuejs.org/v2/guide/mixins.html
 *
 * 自定义hook
 * 自定义hook函数，使用composition API封装的复用功能函数
 * 类似于vue2中的混入技术
 * 自定义hook的优势：很清楚复用代码的来源，更清楚易懂
 *
 */
// 案例：点击页面，获取页面中该处的x,y坐标，并显示在组件中
import { defineComponent, watch } from 'vue';
import getXAndY from './hook';
import urlRequests from './urlRequests';
// urlRequests使用了泛型，调用该函数时，必须明确泛型
interface IProducts {
  id: number;
  title: string;
  price: number;
}
interface IAddress {
  name: string;
  address: string;
  distance: number;
}
export default defineComponent({
  name: 'DefineHook',
  setup() {
    // 最终，将下列代码封装为一个函数-自定义钩子
    // let x = ref(-1);
    // let y = ref(-1);
    // // 点击页面，获取坐标，至少需要页面加载完成，最早在mounted阶段
    // const handleClick = (event: MouseEvent) => {
    //   console.log(event);
    //   x.value = event.pageX;
    //   y.value = event.pageY;
    // };
    // onMounted(() => {
    //   window.addEventListener('click', handleClick);
    // });
    // //组件崩溃了，卸载前，将给window对象的事件解绑
    // onBeforeUnmount(() => {
    //   window.removeEventListener('click', handleClick);
    // });
    // 解构引入的函数，拿到x,y;并不是{x,y}整体是响应式的，而是x,y分别定义成了ref,因此可以解构
    const { x, y } = getXAndY();
    // 进入页面，就请求数据，在created生命周期钩子中引入自定义钩子urlRequests.ts
    // 结构自定义钩子调用的返回对象
    // 使用的是函数泛型的用法，在函数调用时，明确其返回值的类型
    /**
     *
     * 一、重点：关于数据urlRequests(url: string)中的路径问题：
     * 1.项目启动时，index.html托管在内存中，在http://localhost:8080
     * 2.所以，将data文件夹放在和index.html同级别的public文件夹下
     * 3.访问的路径就是 'data/address.json',路径'data/products.json'同理
     *
     */
    const { loading, data, errorMsg } =
      urlRequests<IAddress>('/data/address.json');
    // data和data1的类型和泛型的类型一致，data是T,data1是T[]
    // 为了和上面的区别，为products解构出的变量起别名，loading:loading1,data:data1,errorMsg:errorMsg1
    // 总结：
    // 1. 解构中起别名，像键值一样，从起别名之后，data1就代替解构的键data了
    // 2. 如果某个函数或接口或类被限定为泛型T了，实现时，变成T[]，代码也是可以成立的；比如：定义的泛型是urlRequests<T>
    // 在此处调用时，声明的是urlRequests<IProducts[]>
    const { data: data1 } = urlRequests<IProducts[]>('/data/products.json');
    // 问题来了，如果我要监视data1的长度怎么办？
    // 代码写完后，报错：原因是泛型IProducts不一定有length属性的
    // watch(data1, () => {
    //   console.log(data1.length);
    // });
    // 注意：1.watch监听时，如果回调中没有参数，data1.value来操作数据。如果有参数val，val=data1.value
    // 注意2：数据data1从空数组变成了有内容的，watch能够监听到
    watch(data1, () => {
      // data1是data的别名，data在自定义hook中定义的是一个ref对象，ref<T|null>(null);因此，在setup中操作是用data1.value
      if (data1.value) {
        console.log(data1.value.length);
      }
    });
    return { x, y, loading, data, errorMsg, data1 };
  }
});
</script>
