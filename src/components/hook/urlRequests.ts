/**
 *
 * @ 发送一个get请求获取数据：
 * 数据没有加载完成，显示loading
 * 加载数据完成，获取data
 * 加载完成没有数据，报错误信息errorMsg
 *
 */
import { ref } from 'vue';
import axios from 'axios';
/**
 *
 * @ 对get请求数据做了很好的封装
 *
 * 不论返回数据的是数组还是对象，不论返回数据对象的属性类型是什么，都抽象成了3个ref对象
 * loading 布尔类型，控制后备内容的显示
 * data 获取的数据ref<T|null>(null)
 * 出错时 提示消息，是string字符串
 *
 * 应对res的不同类型，使用泛型来约束data
 *
 */
export default function urlRequests<T>(url: string) {
  // 数据加载完成前，动画，布尔类型，默认值为true
  const loading = ref(true);
  // data数据，数组或者对象，数组也是对象，空的时候，设定为null,表示空对象
  const data = ref<T | null>(null);
  // 错误提示信息，字符串类型
  const errorMsg = ref('');
  // 1.向后台发起请求，此处用本地数据模拟，将假数据json文件放在public静态文件夹下，当项目启动时；index.html托管在
  // localhost:8080下了，访问的是本地的数据，不存在跨域的问题
  // 2.给获得data的代码，添加一个定时器，模拟数据异步请求过程
  axios
    .get(url)
    .then((res) => {
      // axios是基于promise封装的，then后面是异步的过程，数据请求完成后，才会执行其中的两行代码
      setTimeout(function () {
        loading.value = false;
        data.value = res.data;
      }, 2000);
    })
    .catch((error) => {
      // 异常捕获
      loading.value = false;
      errorMsg.value = error || '未知错误';
    });
  return {
    loading,
    data,
    errorMsg
  };
}
