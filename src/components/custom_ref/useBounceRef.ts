import {customRef} from 'vue';
/**
 * @desc:customRef
 * 关于防抖的封装见文档：https://blog.csdn.net/weixin_41246825/article/details/115206682
 * 防抖(debounce)和节流（throttle）参考文档:https://blog.csdn.net/qq_44741577/article/details/135951852
 *
 * 作用：创建一个ref,并对其依赖项的【追踪】和【触发更新】进行精细控制
 * customRef使用步骤：
 * 1.自定义钩子，钩子函数名 以use+驼峰+Ref结尾
 * 2.在钩子函数内部，返回一个customRef
 * function useHook(){
 *     return customRef((track,trigger))=>{
 *         return {
 *             get(){},
 *             set(value:any){
 *
 *             }
 *         }
 *     });
 * }
 * 3.返回的ref,可以直接在模板中使用，不用再.value
 *
 * */
// 相当于useBounceRef最终返回了一个Ref(value)
export default function useBounceRef<T>(value: T, delay: number = 200) {
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
                    // 防抖debounce的核心：当一个定时器开启后，在定时器timer=null之前，再次触发，定时器就被拨回到t=0时刻，重新开启定时器
                    // 节流throttle的核心：flag=true,等待定时器执行完一次后，才再次开启阀门flag=true;
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
