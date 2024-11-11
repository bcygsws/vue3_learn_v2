/**
 * @desc：provide/inject组件通信时，inject接收后类型丢失，提示为unknown类型
 * 解决：使用vue提供的InjectionKey定义类型并导出成员，作为provide/inject之间传递的key值
 *
 * 参考文档：https://blog.csdn.net/qq_52395343/article/details/129752775
 *
 * */
import {InjectionKey, Ref} from 'vue';

export const colorKey: InjectionKey<Ref<string>> = Symbol();