<template>
  <h3>十三、演示customRef的使用</h3>
  <input type="text" name="" id="" v-model="keywords"/>
  <p>{{ keywords }}</p>
</template>
<script lang="ts" setup>
/**
 *
 * @desc: customRef的用法
 * 作用：创建一个自定义Ref,并对其依赖项【跟踪】和【界面触发】进行显式控制
 *
 * 语法：
 * customRef((track,trigger)=>{
 * return {
 *    get(){},
 *    set(){}
 * }})
 * 案例：在文本框中输入内容，界面中p标签内的内容，也会同步更新
 * 使用customRef可以做一个防抖效果，对p标签中的数据跟踪input中的数据以及界面触发，做一个防抖处理
 *
 * 二、防抖-性能优化的方式之一
 * 参考文档：https://blog.csdn.net/weixin_41246825/article/details/115206682
 * 场景：文本框中连续多次输入内容时，change方法多次执行，影响性能；设置一种方式，
 * 让在输入暂停或结束时再触发某个事件（触发间隔超过设定时间，才进行某种操作）
 * 三、闭包的理解
 * 参考文档：https://blog.csdn.net/weixin_43606158/article/details/90213668
 * 3.1 概念
 * 闭包：在一个内部函数里，对外部作用域（不是全局作用域）内的变量进行引用时，这个内部函数（return 返回的那个嵌套在函数里的函数）
 * 就称为闭包
 *
 * 概念的另一种表述：
 * 闭包是由两部分组成：闭包是由函数和创建该函数的环境组成
 *
 * 伪代码实例：
 * c 环境
 * function a(){
 *    let num=1;
 *    return function b(){
 *       // 引用num的语句，闭包（return的这个内部函数）中引用的包裹函数中的变量不会被释放
 *    }
 * }
 *
 * a();// c环境中引用了函数b
 *
 *
 * 3.2 JavaScript的垃圾回收机制：
 * 如果一个变量对象不被引用，它就会被回收
 * 如果两个对象相互引用，没有第三方对象引用它们，这两个对象会被回收
 * 函数a被b引用，函数b又被a外的c引用，那么函数a执行后，不会被回收
 *
 * 3.3 闭包的特点
 * 可以读取自身函数外部的变量（沿着作用域链寻找），先查找函数内部是否有定义，如果没有再想函数外部寻找（选择离调用处最近的那个变量来使用）
 * 延长变量的生命周期
 * 函数嵌套在函数a中
 * 函数a返回函数b
 *
 * 3.4 闭包的优缺点
 * 闭包的优点：
 * a.保证变量的安全（比如函数a中num变量只有通过函数b才能访问，不能通过其他途径访问，这就保证了变量num的安全，Java中使用访问控制符来
 * 限制访问权限，JavaScript中没有，可以使用闭包来模拟）
 * b.在内存中维持一个变量
 *
 * 闭包的缺点：
 * 容易造成内存泄漏，因为 闭包中引用的包裹函数中的变量永远不会被释放，所以在必要的时候，要及时释放这个闭包函数
 *
 * 那么，如何释放闭包占用的内存？
 * a=null; // 包裹函数等于null，解除函数的引用，就可以被垃圾回收机制回收，也即释放了这个闭包函数
 * 参考文档：
 * https://blog.csdn.net/weixin_45522097/article/details/126715122
 *
 */
// import { ref, customRef } from 'vue';
// import useBounceRef from "./useBounceRef.ts";// 错误的方式
import useBounceRef from './useBounceRef'; // 正确的方式，系统内部解析成了useBounceRef.js文件，省略后缀，自动依引入.js
// 自定义hook
// 传入的值除了字符串类型，可能是number数字；使用泛型来约束
// 抽离出去，封装成useBounceRef.ts
defineOptions({
  name: 'CustomRef'
})

// 1.正常情况下的跟踪
// const keywords = ref('abc');
// 2.使用customRef显式控制
const keywords = useBounceRef<string>('abc', 1500);
</script>
