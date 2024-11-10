<template>
  <h3>三、操作代理数据，影响界面更新</h3>
  <h4>Update组件</h4>
  <p>名称：{{ user.name }}</p>
  <p>年龄：{{ user.age }}</p>
  <p>性别：{{ user.gender }}</p>
  <p>配偶：{{ user.wife }}</p>
  <button @click="updatePage">更新数据和页面</button>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
// 引入代理对象的接口
import IObj from '../../types/person';
// 代理数据影响界面更新
/**
 *
 * @ 需求：
 * 如果我使用obj点语法或者user点语法，为已经定义的user添加一个属性，然后页面会更新吗？
 * a.尝试直接使用obj.gender="男"，来为user添加属性
 * 总结：
 * 1.如果要实现-操作目标对象中的属性，添加或删除属性，同时更新页面；要使用操作代理对象的方式
 *  (user.gender/delete user.age)；这样obj中的数据会发生变化，而且页面随之更新；
 * 2.使用obj.gender/delete obj.age 是不能实现页面更新的；obj.gender的方式，不能将属性添加
 * 到目标对象obj中，页面不会更新；delete obj.age的方式，确实可以从目标对象中删除age属性，但
 * 是无法更新页面
 *
 * b.尝试使用泛型或者接口，来去掉any这种类型定义
 *
 * 二、vue3学习文档
 * 参考:https://blog.csdn.net/qq_44999663/article/details/128145045
 * 2.1 在vue2中，使用defineProperty()拦截对象的属性操作，包括属性的读写、属性的添加或删除等；
 * 缺陷：defineProperty处理对象有个缺陷，属性的添加或删除，页面不会更新；
 * 2.2 同样在vue2，通过重写数组的元素操作的所有方法，来拦截数组元素的操作
 * 缺陷：通过下标改变元素值，和改变数组的长度，页面不会更新
 *
 * 辅助解决：Vue.set the.$set() / Vue.delete this.$delete()
 *
 * 2.3 在vue3中，这个问题就不存在了。可以直接操作被代理对象，页面会自动更新
 * 添加属性：user.gender="男";
 * 删除属性：delete user.age;
 * 页面会自动更新
 *
 * Vue3响应式的原理是：两个对象Proxy和Reflect
 * Proxy：拦截date对象的任意属性的任意操作（多达13种操作），属性的读写、属性的添加和删除等
 * Reflect：动态地对被代理对象（reactive(obj)之后的对象）的属性进行特定的操作
 *
 */
export default defineComponent({
  name: 'Update',
  setup() {
    // const obj = {
    // 方式1：期待使用obj点语法，为user增加一个属性，且更新页面，最终失败，gender显示还是空值，
    //  而且Proxy代理对象中也没有gender属性；将obj的any类型注解去掉，恢复原状
    const obj = {
      name: '张三',
      age: 25,
      wife: {
        name: '小甜甜',
        age: 20,
        cars: ['奔驰', '宝马', '奥迪']
      }
    };
    // 定义一个代理对象user,目标对象是obj
    let user: IObj = reactive(obj);
    console.log(user);
    // 注意：Vue3中事件处理函数（类似vue2中的methods中的方法），要写成箭头函数的形式
    const updatePage = () => {
      // 为普通对象obj,增加或删除属性，对象的属性值确实发生了改变，但是界面不会更新
      // obj.gender = '男'; // 报错：obj对象上不存在gender属性，为obj添加一个any的类型注解
      // 结果：控制台打印的 obj对象确实删除了age属性，但是界面没有更新
      // delete obj.age; // age的值没了，目标对象obj中也没有age属性了，但是页面没有更新
      // console.log(obj);
      // 方式2：使用user的点语法，为user增加gender属性，点击按钮，观察页面性别处是否由空白变为有值;
      // 首先user.gender上也报错，提示类型不匹配的问题，为reactive添加泛型reactive<any>(obj)，这个
      // 报错bug解决；然后，点击按钮，查看性别处，由【空值】变成了【男】，页面更新了，而且打印的代理对象
      // 中user也增加了gender这个键值对，obj目标对象上也有gender这个属性了
      // user.gender = '男';
      delete user.age; // age的值没了，目标对象中也没有age属性了，页面更新了
      console.log(user);
    };
    return { user, updatePage };
  }
});
</script>
