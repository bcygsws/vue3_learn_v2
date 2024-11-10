export function checkType(data) {
  // call是function的一个方法，call(obj,arg1,arg2,……)；
  // 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

  return Object.prototype.toString.call(data);
}
