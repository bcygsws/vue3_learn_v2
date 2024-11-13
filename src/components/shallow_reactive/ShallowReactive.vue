-
<template>
  <h3>九、浅监视或者浅劫持或者浅响应式</h3>
  <p>m1:{{ m1 }}</p>
  <p>m2:{{ m2 }}</p>
  <p>m3:{{ m3 }}</p>
  <p>m4:{{ m4 }}</p>
  <p>m5:{{ m5 }}</p>
  <p>m6:{{ m6 }}</p>
  <button @click="changeData">更新数据</button>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  shallowReactive,
  shallowRef
} from 'vue';

export default defineComponent({
  name: 'ShallowReactive',
  setup() {
    const m1 = reactive({
      name: '张勇',
      age: 19,
      fallow: {
        cars: {red: '法拉利'}
      }
    });
    const m2 = shallowReactive({
      name: '张勇',
      age: 19,
      fallow: {
        cars: {red: '法拉利'}
      }
    });
    const m3 = ref({
      name: '张勇',
      age: 19,
      fallow: {
        cars: {red: '法拉利'}
      }
    });
    const m4 = shallowRef({
      name: '张勇',
      age: 19,
      fallow: {
        cars: {red: '法拉利'}
      }
    });
    // 只处理value的响应式(基本类型数据的)，传入的对象不会进行reactive处理
    const m5 = shallowRef(4);

    // 注意：reactive和shallowReactive用以处理基本类型，比如：number时，数据值改变了，但都不会触发【页面更新】
    // let m6 = shallowReactive(4);
    let m6 = reactive(4);
    // 更新数据的方法changeData
    const changeData = () => {
      // 注意：这俩操作要单独验证，观看状态

      // m1：深度监视、深度响应式，深度劫持
      // m1.name += '==';
      // m1.fallow.cars.red += '1';
      // console.log(m1);

      // 二、shallowReactive的使用
      // m2：shallowReactive是浅监视、浅响应式、浅劫持。恰好是shallowReadonly的补集
      // m2仍然是一个Proxy对象，深层次的数据能够改变，但是深层次的数据改变不会触发页面更新
      // 三种情形：
      // 2.1 单独作用m2的最外层属性name;数据更新，且触发页面更新
      // m2.name += '==';
      // 2.2 单独作用m2的内层属性，fallow.cars;数据更新，但是不能触发页面国内新能
      // 2.3 m2最外层和最内层的对象更改操作都有，则深层次的更改仍然会显示在页面中（原因是存在浅层的劫持name,更新页面的同时，会将
      // 深层次改变的数据，显示在页面上）

      // 2.1.a 单独作用内层的red属性，观察效果，数据更新，但不会触发页面更新
      // m2.fallow.cars.red += '1';
      // console.log(m2);
      // 三、Ref对象的使用（Ref作用于对象，会按照reactive进行处理）
      // 1.m3：ref传入对象，内部会按照reactive进行处理，等效于第一种情形了
      // 2.挂载在m3 Ref对象上的value属性，m3.value是一个代理对象Proxy（这也是m3.value等效于m1的原因）
      // 3.m3深监视、深劫持、深度响应式
      // m3.value.name += '==';
      // m3.value.fallow.cars.red += '11';
      // console.log(m3); // m3里面的属性_shallow: false，表示是深监视，深劫持

      // 四、shallowRef的使用（只会改变value值，不会进行对象的reactive处理）
      /**
       *
       * @对比：ref和shallowRef
       *
       * 对比m3，会发现shallowRef和Ref包裹对象的区别：
       * 4.1 m3=ref(obj),m3.value是一个Proxy代理对象
       * 4.2 m4=shallowRef(obj),m4.value就只是一个普通的对象了{}，不再具有响应式的功能，所以只会更改内层和外层属性的数据，不会触发页面更新了
       * m4:浅ref shallowRef
       * 4.3 shallowRef只能用于处理基础数据类型：包括string,number,boolean,null,undefined等;就如同ref处理基本数据类型一样；但是，当
       * 遇到引用数据类型（Function Object和Array时），shallowRef就无能为力了
       *
       *
       */

      // 打印m4中是一个Ref对象---不再是Proxy代理对象了,最外层属性和深层次属性的数据都能改变，但是不能触发页面更新
      // m4.value.name += '==';
      // 打印m4，m4中的_value是一个普通对象，不是像m3中的代理对象了；cars的red值确实变化了，但是没有触发页面更新
      // m4.value.fallow.cars.red += '1';
      // console.log(m4); // __v_isShallow: true,表示浅监视，浅Ref

      // 五、shallowRef处理基本数据类型的value响应式，传入对象时，不会按照reactive处理
      // 打印发现,即使shallowRef处理{}，m4=shallowRef({name: '张勇'}),m4.value不再试代理对象Proxy{},而是一个普通对象{}

      // m5:shallowRef只会处理value的响应式，不会进行对象的reactive处理
      // 处理基本类型数据（非对象，Ref遇到对象，会reactive处理）数据改变，同时触发页面更新
      // m5.value += 1;

      m6 += 1;
      console.log(m6);
    };
    return {
      m1,
      m2,
      m3,
      m4,
      changeData,
      m5,
      m6
    };
  }
});
/**
 *
 * @desc：总结：浅劫持、浅响应式或浅监视
 *
 * reactive和shallowReactive、ref和shallowRef的使用场景：
 * 1.shallowReactive只处理数据对象最外层的响应式，浅响应式
 * 2.reactive用于处理数据对象，深监视、深响应式、深劫持；
 * m6对象验证：reactive或者shallowReactive处理基本类型的情形，例如number类型，数据改变，页面不会更新
 *
 * 3. shallowRef只处理value的响应式，传入对象不会进行默认的reactive处理(意思是：处理基本类型时，ref和shallowRef基本等效)
 * 4.基本数据类型的响应式，使用ref
 * 5.ref中传入了对象，系统内部会使用reactive来处理它
 * 6.一般情况下，用ref和reactive即可
 *
 *
 * 如果数据的结构比较深，需求是只处理最外层的属性，使用shallowReactive
 * 如果一个对象数据，后面会产生新的对象来替换，可以使用shallowRef
 *
 */
</script>
