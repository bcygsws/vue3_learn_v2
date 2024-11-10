import { useStore } from 'vuex';
import { computed } from 'vue';
// 处理state的Mapper函数
export function useStateMapper(mapper, mapFn) {
  const store = useStore();
  const storeStateFns = mapFn(mapper); // 对象
  const storeState = {};
  // Object.keys将storeStateFns的键名取出，组成一个数组
  Object.keys(storeStateFns).forEach((fnKey) => {
    // vuex源码中mapState和mapActions方法使用的是this.$store，更改this绑定为{$store:store}
    const fn = storeStateFns[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);
  });
  return storeState;
}
/**
 *
 * mapper 是传入的某一类型的参数，是state的属性名，getters的数组或者actions的函数名的数组
 * mapFn则相当于mapState mapGetters mapActions这些方法
 *
 */
// 处理Action的Mapper
export function useActionMapper(mapper, mapFn) {
  const store = useStore();
  const storeActionsFns = mapFn(mapper); // 对象
  const storeActions = {};
  // Object.keys将storeStateFns的键名取出，组成一个数组
  Object.keys(storeActionsFns).forEach((fnKey) => {
    // vuex源码中mapState和mapActions方法使用的是this.$store，更改this绑定为{$store:store}
    storeActions[fnKey] = storeActionsFns[fnKey].bind({ $store: store });
  });
  return storeActions;
}
// 处理mutations的Mapper
export function useMutationsMapper(mapper, mapFn) {
  const store = useStore();
  const storeMutationsFns = mapFn(mapper);
  const storeMutations = {};
  Object.keys(storeMutationsFns).forEach((fnKey) => {
    storeMutations[fnKey] = storeMutationsFns[fnKey].bind({ $store: store });
  });
  return storeMutations;
}
