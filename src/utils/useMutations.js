import { mapMutations, createNamespacedHelpers } from 'vuex';
import { checkType } from './checkType';
import { useMutationsMapper } from './useMapper';
export function useMutations(moduleName, mapper) {
  let mapperFn = mapMutations;
  if (checkType(moduleName) === '[object String]' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapMutations;
  }
  return useMutationsMapper(mapper, mapperFn);
}
