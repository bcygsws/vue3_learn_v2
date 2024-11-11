<!-- async_suspense分支：创建了一个异步组件，引入父组件Fat模板中 -->
<template>
  <div>{{ msg }}</div>
</template>
<script lang="ts">
/**
 *  @一、Promise的使用和race()、all()方法
 * 参考文档：https://blog.csdn.net/rjlmylover_zyw/article/details/122920303
 * 参考文档1：https://blog.csdn.net/weixin_44383261/article/details/117356106
 * 参考文档2：https://blog.csdn.net/hlpp123/article/details/123706588
 * 1.1.为解决回调地狱，提出的一种异步编程解决方案-Promise
 *
 *  1.2.Promise是一种链式调用
 * pending到fulfilled:表示 未决定的到已成功
 * pending到rejected:表示 未决定的到已失败
 * Promise本身是用来处理异步任务的，那么一般执行过程是：指定回调（选择执行那个then分支）->改变状态->执行回调；但是，
 * 若new Promise()是同步代码，则执行过程是：改变状态->指定回调->执行回调
 *
 * 1.3.特别注意：
 * new Promise(cb) cb中使用throw语句（等效于调用了一个reject()函数），可以将Promise的状态从【未决定的】修改为【已失败】
 * 代码演示：
 * let p=new Promise((resolve,reject)=>{
 *    throw '出现异常';
 * })
 * 此时，promise状态，由pending变为rejected。而后，转向 执行失败后的回调
 * 另外，Promise状态如果一直是pending，状态不改变，那么.then后面的已成功（或已失败）回调不会执行
 *
 * 1.4.Promise状态改变，第一个then会执行resolve和reject传递的值；后面再跟then，then里面的回调仍然继续执行；但是打印回调中
 * 的参数value为undefined
 *
 * 1.5.promise的异常穿透-上面4中resolve改成reject，就是promise异常穿透的含义
 * 异常穿透：一旦第一个new Promise((resolve,reject)=>{
 *  reject('fdasf');// 一旦是reject语句，无论后面接多少then,并不会像顺序执行了，而是只执行catch(error=>f(error);)
 * })
 * 1.6.promise链的中断？
 * promise链中断：如果不书写任何resolve或reject的数据，promise链就会中断，后面的then回调都不会执行了
 * 代码示例：new Promise((resolve,reject)=>{
 *    // 如果不书写任何resolve或reject的数据，promise链就会中断，后面的then回调都不会执行了
 * })
 * .then()
 * .then()
 * ……
 *
 *
 * 1.7.Promise还有两个重要方法：
 * 竞争函数race；执行先成功获得数据的请求
 * Promise.race([p1,p2,p3……]);
 * all函数：所有数据请求都成功了才执行
 * Promise.all([p1,p2,p3……]);
 * 只有p1,p2到所有的对象都是resolve状态，才会指定回调（才会选择成功回调）
 * 只要p1,p2,p3……之中有一个是reject状态，指定回调（必然是失败的回调）
 *
 * 特别注意：
 * 1.await + Promise对象时，必须获取resolve和reject返回的结果，才会执行后面的代码；
 * 2.如果是非Promise对象，把这个非Promise对象作为返回结果
 *
 * 二、回顾原生AJAX的创建过程：
 * 参考文档1：https://blog.csdn.net/nilmao/article/details/123894943?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-123894943-blog-127348369.235%5Ev28%5Epc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-123894943-blog-127348369.235%5Ev28%5Epc_relevant_recovery_v2&utm_relevant_index=1
 * post请求的三种编码格式
 * 参考文档2：https://blog.csdn.net/u013258447/article/details/101107743?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-101107743-blog-118662566.235%5Ev28%5Epc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-4-101107743-blog-118662566.235%5Ev28%5Epc_relevant_recovery_v2&utm_relevant_index=5
 *
 * Content-Type:application/x-www-form-urlencoded
 * ajax的默认请求格式
 * 请求体中的数据，以json字符串的形式发送到后端
 *
 * Content-Type:application/json
 * axios的默认请求格式
 * 请求体中的数据，以普通表单的形式发送到后端
 *
 * Content-Type:multipart/form-data
 * 会将请求体中数据处理为一条消息，以标签为单元，用分隔符分开；既可以上传键值对，也可以上传文件
 *
 * get请求和post请求的区别：
 * 参考文档3:https://blog.csdn.net/wang037195/article/details/99585320?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-3-99585320-blog-101107743.235%5Ev28%5Epc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-3-99585320-blog-101107743.235%5Ev28%5Epc_relevant_recovery_v2&utm_relevant_index=4
 *
 *
 * 2.1 创建ajax对象
 * const xhr=new XMLHttpRequest();
 * 2.2 设置请求方法和请求地址url
 * xhr.open(方式,url)
 * xhr.open(方式,url,第三个参数可选：布尔值，true表示异步/false表示同步)
 *
 * 注意：如果要得到j响应体数据类型为json，需要手动设置请求类型为json;这一步写在xhr.open()语句之前
 *
 * 2.2.1 需要设置响应体为json
 * xhr.responseType="json";
 * 2.2.2 同时open中设置的请求方式仍然是get类型；xhr.open('get',url)
 *
 * 2.3 发送请求
 * 如果是post请求方式，需要在send发送请求之前设置 请求响应头
 * xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
 * xhr.setRequestHeader('name','atGuiGu');
 * xhr.send();
 * 同时，post请求方式时，send可能需要传参，示例：xhr.send('a=100&b=200&c=300');
 *
 * 2.4 监听服务端请求的返回状态
 * readyState值不同，表示ajax请求服务器处于不同阶段
 * 0 未初始化
 * 1 open方法调用完毕
 * 2 send方法调用完毕
 * 3 服务端返回部分请求数据
 * 4 服务端返回所有请求数据
 *
 * onreadystatechange=function(){
 *    if(xhr.readyState===4){
 *        if(xhr.status>=200 && xhr.status<300){
 *
 *  }
 *
 *  }
 * }
 *
 * 二、取消请求
 * btns[1].addEventListener('click',function(){
 *    xhr.abort();
 * })
 * 三、请求超时异常
 * 3.1 xhr对象创建以后，设置请求超时时间，假设设为2000ms
 * xhr.timeout=2000;
 * 超时回调
 * xhr.ontimeout=function(){
 * // 超时逻辑
 * }
 *
 * 网络异常回调
 * xhr.onerror=function(){
 * // 网络异常逻辑代码
 * }
 *
 *
 */
const getInfo = async () => {
  /**
   *
   * 参考文档：
   * https://blog.csdn.net/rjlmylover_zyw/article/details/122920303
   *
   * await和Promise配合使用，效果是：
   * await new Promise()返回一个resolve()或者reject()函数，必须等待resolve和reject执行完毕后，才会跟着执行当前语句后面的代码
   *
   */
  // 2000ms后，再处理promise中的resolve;用new Promise做了一个延时操作；外层再套一个defineAsyncComponent实现定义异步组件（AsyncFat.vue文件中）
  // （resolve,reject）其中resolve和reject参数都是函数
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // 对比：设置一个2s的定时器
  // 与new Promise()实现的异步不同，setTimeout会进入异步宏任务，先返回info;2s后再处理setTimeout(f,2000)。达不到在当前组件模板中延迟
  // 显示info对象的目的

  // setTimeout(() => {
  //   console.log(222);
  //   return;
  // }, 2000);
  console.log(1111);
  return {
    name: '蓉蓉',
    age: 18
  };
};
export default {
  async setup() {
    const msg = await getInfo();
    console.log(msg);
    // 供模板使用
    return {
      msg
    };
  }
};

// import ErrorComponent from './ErrorComponent.vue';
// 定义局部异步组件，参考文档：https://blog.csdn.net/weixin_43365995/article/details/123386594
// export default {
//   components: {
//     AsyncButton: defineAsyncComponent({
//       // 加载默认演示为200ms
//       delay: 200,
//       timeout: 3000,
//       loader: () => import('./AsyncButton.vue'),
//       errorComponent: ErrorComponent,
//       onError(error, retry, fail, attempts) {
//         if (attempts <= 3) {
//           retry();
//         } else {
//           fail();
//         }
//       }
//     })
//   }
// };
</script>
