import { customRef } from 'vue';
// 关于防抖的封装见文档：https://blog.csdn.net/weixin_41246825/article/details/115206682
// 相当于useBounceRef最终返回了一个Ref(value)
export default function useBounceRef<T>(value: T, delay = 200) {
  // 定时器是number类型，在setTimeout第一个函数参数内部，清除定时器，timer=null;将其声明为联合类型
  // 以闭包的概念分析：timer是闭包（内部函数）引用包裹函数中的变量，timer不会被释放 
  let timer: number | null;
  // 返回的是一个Ref类型
  // 闭包，保证上一次点击时的timer值还存在，然后在if(timer)分支清除了这个定时器
  return customRef((track, trigger) => {
    return {
      get() {
        // 告诉vue跟踪数据
        track();
        return value;
      },
      set(newVal: T) {
        /**
         * 
         * 防抖的代码：
         * 防抖：在间隔一定时间后，才进行某种操作
         * 1.timer只在初次时，为空；
         * 2.当定时器在间隔时间内第二次触发时，此时第一次timer的值，由于闭包的存在并没有释放，后面的操作依次类推
         * 直至大于等于时间间隔（delay）值，才执行setTimeout中事件处理函数中的操作
         * 
         * if(timer){
         * // 清除定时器
         * }
         * timer=setTimeout(()=>{
         * 
         * 
         * },delay)
         * 
         */
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          // 进行的操作
          value = newVal;
          // 触发界面更新
          trigger();
          // 清空定时器
          timer = null;
        }, delay);
      }
    };
  });
}
