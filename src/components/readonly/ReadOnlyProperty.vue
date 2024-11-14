<template>
  <h3>十、readonly和shallowReadonly</h3>
  <p>{{ user2 }}</p>
  <button @click="changeUser">浅只读-点击后，对象的深度不执行只读转换</button>
</template>
<script lang="ts">
import { defineComponent, reactive, readonly, shallowReadonly } from 'vue';
interface IUser {
  name: string;
  age: number;
  cars: {
    red?: string;
  };
}
export default defineComponent({
  name: 'ReadOnlyProperty',
  setup() {
    const user = reactive({
      name: '张恒',
      age: 15,
      cars: {
        red: '法拉利'
      }
    });
    // 1.深只读，嵌套对象的所有层级的属性都是只读的，不能更改
    const user1 = readonly(user);
    console.log(user1); // Proxy代理对象
    // user1.name += '=='; // error: Cannot assign to 'name' because it is a read-only property.
    // user1.cars.red = '劳斯莱斯';// error: Cannot assign to 'red' because it is a read-only property.
    // 2.浅只读：创建了一个代理，对象自身的property只读，但是不对嵌套对象的深度进行只读转换
    // const user2 = shallowReadonly(user);
    const user2 = shallowReadonly<IUser>(user);
    console.log(user2);
    function changeUser() {
      // Error:Cannot assign to 'name' because it is a read-only property.
      // user1.name += "==";
      // user1.cars.red += '**';
      // delete user1.age;
      // 注释放开，提示：name是user对象自身的property,是只读的，不能更改
      // user2.name += "==";
      // 浅只读,外层属性只读；不对嵌套对象的深度进行只读转换，换言之；在shallowReadonly中，嵌套的深度是可读可写的
      user2.cars.red += "666";
      // 3.特别注意：浅只读的时候，red属性用接口声明为可选的，才可以删除
      // The operand of a 'delete' operator must be optional.
      // 且在Vue3中，delete删除属性，不必使用$set语句来辅助更新界面；delete语句后，会自动更新界面
      // delete user2.cars.red;
      console.log(user2); // Proxy{}
    }
    return {
      user1,
      user2,
      changeUser
    };
  }
});
/**
 *
 * @desc:readonly 和 shallowReadonly
 * 只读和浅只读的使用场景：
 *
 * 注意：浅只读和只读，都是在reactive对象上，使用的
 *    readonly(reactive({}))
 *    shallowReadonly(reactive({}))
 *
 * readonly：深只读
 *  返回一个对象（响应式或纯对象）或ref,并返回原始代理的只读代理
 *
 * shallowReadonly:浅只读
 * 创建一个代理，其自身的property（自身的属性，指得是嵌套对象的最外层属性）只读，对其他内层的属性不执行只读的转换
 * 类比shallowReactive:（补集操作：和shallowReactive功能相反，shallowReactive表示对象的自身Property属性能够实现响应式，深层次的属性数据可以改变，但是bu
 * 能触发页面更新）
 *
 */
</script>
