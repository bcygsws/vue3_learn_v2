<template>
  <h3>十一、toRaw和markRaw的使用</h3>
  <p>{{ state }}</p>
  <!-- toRaw的使用 -->
  <button @click="handleToRaw">toRaw,数据变化，页面不更新</button>
  <!-- markRaw的使用 -->
  <p>{{ state }}</p>
  <button @click="handleMarkRaw">markRaw,数据不能更改</button>
  <p>{{ raw1 }}</p>
  <button @click="handleMR">markRaw</button>
  <p>{{ person1 }}</p>
  <button @click="handleObj">普通对象改变值</button>
</template>
<script lang="ts">
interface IUser {
  name: string;
  age: number;
  cars: { red: string };
  likes?: string[];
}
import { defineComponent, reactive, toRaw, markRaw } from 'vue';
/**
 *
 * 1.toRaw 是一个还原方法，可以用于临时读取，但是对象不被代理/跟踪，数据可以改变，页面不能更新
 *
 * 2.markRaw 标记一个对象，永远不能转化为代理对象；返回对象本身
 * markRow的使用场景：
 * 1.适用于不适宜定义为响应式的对象，第三方类实例或Vue组件对象不宜定义为响应式
 * 2.在渲染不可变数据源的大列表时，使用markRaw可以提升性能
 *
 */
export default defineComponent({
  name: 'ToAndMarkRaw',
  setup() {
    const state = reactive<IUser>({
      name: '张衡',
      age: 19,
      cars: {
        red: '劳斯莱斯'
      }
    });
    // raw:含义，初始的，原始的
    // 1.toRaw是一个还原方法，将成为深度响应式的对象还原成普通对象，可读可写，但是页面不会更新
    // Object--->Reactive(深度响应式)--->Object 数据最外层和深层次都能变化，但是页面不会更新
    const handleToRaw = () => {
      const user = toRaw(state);
      // toRaw(state)之后，state变化了，state对象数据确实改变了，但页面没有更新；打印user还原成了一个普通对象，普通对象
      // 是无法触发响应式的，这在ref和reactive的使用中验证过
      user.name += '=';
      user.cars.red += '=';
      console.log(user); // 控制台打印的user是一个普通的对象 {}
    };
    // 标记一个对象，永远不能成为代理对象
    // 情形一、深度响应式数据reactive对象，likes在被标记成markRaw后，执行了当前的操作一次；
    // 此后，其值再也不会变化了
    const handleMarkRaw = () => {
      // 标记likes数组，永远不能成为代理对象了
      // 为深度响应式数据state，添加一个likes属性
      // state.likes = markRaw(likes); // error: Property 'likes' does not exist on type '{ name: string; age: number; cars: { red: string; }; }'.
      // 就执行了这一次的改变，在点击按钮，就不会改变了
      const likes = ['吃', '喝', '玩', '乐'];
      console.log(state);
      // 情形a.此时likes还是响应式的
      // state.likes = likes;

      // 情形b.此时likes不是响应式的
      state.likes = markRaw(likes);
      const arr = state.likes;
      window.setTimeout(() => {
        arr[0] += '***';
        console.log(state);
        console.log('reactive响应式对象添加属性，看是否执行了？');
      }, 1000);
      // 这行likes[0]=likes[0]+"***";点击无数次按钮后，state.likes[0]="吃***"，最外层和深层次的所有属性值，都不会再改变了。
      // 而且，界面更不会更新
    };
    /**
     *
     * 对于普通对象，没有ref或者reactive包裹的普通对象
     * markRaw包裹它没有意义，对象的属性值都能改变
     * 只有对于情形一的情况：为添加的属性likes（本来是响应式的），markRaw(likes)属性后，数据只改变一次，而后再也不会改变了
     *
     *
     */
    // 情形二、普通对象编辑为markRaw属性和深度的属性值都能改变，但是不会触发页面更新
    const person = {
      name: '张衡',
      age: 18,
      cars: ['北京', '上海', '南京']
    };
    const raw1 = markRaw(person);
    const handleMR = () => {
      // raw1.name += '==';// name属性值改变，但是界面不会更新
      raw1.cars[0] += '==';
      console.log(raw1); // 同样，深度属性的值也能够改变，但是界面不会更新
    };
    // 对比:普通对象，能改变值，但无法触发界面更新
    const person1 = {
      name: '张衡',
      age: 18,
      cars: ['北京', '上海', '南京']
    };
    const handleObj = () => {
      person1.cars[0] += '==';
      console.log(person1);
    };
    return {
      state,
      raw1,
      person1,
      handleToRaw,
      handleMarkRaw,
      handleMR,
      handleObj
    };
  }
});
</script>
