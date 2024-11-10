import { mapActions, createNamespacedHelpers } from 'vuex';
import { useActionMapper } from './useMapper';
import { checkType } from './checkType';
/**
 *
 * @ param {*} moduleName 命名空间名称，不带命名空间的，第一个参数传入一个空字符串
 * @ param {*} mapper 方法名集合 ['fn1', 'fn2']
 * @ returns
 */
export function useActions(moduleName, mapper) {
  let mapperFn = mapActions;
  // 如果使用模块化，则使用vuex提供的createNamespacedHelpers方法找到对应模块的mapActions方法
  if (checkType(moduleName) === '[object String]' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions;
  }

  return useActionMapper(mapper, mapperFn);
}
