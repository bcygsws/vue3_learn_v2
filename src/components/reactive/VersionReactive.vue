<template>
  <h3>文本：vue2和vue3响应式实现原理的对比</h3>
</template>
<script lang="ts">
/**
 *
 * 八、vue2和vue3数据响应式对比
 * @ 比较vue2和vue3的数据响应式的底层实现原理
 * 详情参考文档：https://www.cnblogs.com/fundebug/p/responsive-vue.html
 * reactive分支
 *
 *  vue2的响应式：
 * 一、vue2响应式实现原理步骤-术语
 * 1.1数据劫持/数据代理（侦测数据的变化）
 * 1.2收集依赖（视图中依赖哪些数据）
 * 1.3发布订阅模式（“数据”变化时，自动通知需要更新的视图部分，并进行更新）
 *
 * 二、参考 《深入浅出Vue.js》，以回顾vue2底层数据实现响应式的整个过程
 * 2.1 new Vue（）时，Vue会通过调用_init方法进行初始化，将data中的数据转换成getter/setter的形式，以跟踪数据的变化；对象被读取时，
 * getter函数执行；对象被重新赋值时，setter函数执行
 * 2.2 外界通过Watcher(观察者对象)读取数据时，getter函数执行，并将Watcher添加到依赖中
 * 2.3 对象的值该变时，setter函数执行；setter会通知 之前依赖收集的Dep(订阅者对象)中的每一个Watcher对象，我的值改变了，需要更新视图；
 * 对应的观察者对象Watcher就会调用update方法，完成视图更新
 *
 * 对象：是通过defineProperty对对象的属性值的读取和修改进行劫持（监视/拦截）
 * 数组：通过重写数组的【更新数组的元素的一系列方法】来实现元素修改的劫持，例如：Array的unshift、push、pop、shift
 * 等方法都需要重写
 *
 * 缺点：
 * 1.对象中：添加和删除属性，页面不更新
 * 2.数组中：通过下标更改元素值(arr[3]="更改元素值")或改变数组的长度length，页面不更新
 *
 * })
 *
 *
 * vue3的数据响应式
 * Proxy代理：拦截data对象的任意属性的任意操作（总共多达13种操作），包括属性的读写、属性添加和属性删除等---属性操作拦截
 * Reflect反射对象：动态地被代理对象(目标对象)的属性进行特定的操作---属性操作处理
 *
 * new Proxy(data,{
 *    get(target,prop){
 *        return Reflect.get(target,prop)
 *        },  // 拦截读取属性
 *    set(target,prop,value){// 更改已有属性的属性值或者添加新属性，set方法都会调用
 *        console.log('set方法调用了');
 *         return Reflect.set(target,prop,value)
 *        },// 拦截设置或添加新属性
 *    deleteProperty(target,prop){
 *      return Reflect.deleteProperty(target,prop)
 *         }, // 拦截删除属性
 *
 * })
 *
 *
 *
 */
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'VersionReactive'
});
</script>
