<template>
  <h3>使用toRefs将响应式对象转成普通对象，每一个普通对象都是一个Ref</h3>
  <p>foo:{{ foo }}</p>
  <p>boo:{{ boo }}</p>
  <p>foo2:{{ foo2 }}</p>
  <p>boo2:{{ boo2 }}</p>
</template>
<script>
/**
 *
 * 探讨toRefs前 和 最后toRefs的区别：
 * 先对响应式reactive对象进行分解，toRefs后会拿到两个Ref。Ref改变值时，在setup函数中需要后面跟一个value
 * 最后阶段，toRefs显然更科学，先是reactive中对象进行值修改，最后再使用toRefs，方便在模板中调用
 *
 */
import { defineComponent, toRefs, reactive } from 'vue';
export default defineComponent({
  name: 'UnderToRef',
  setup() {
    const state = reactive({
      foo: 'a',
      boo: 'b'
    });
    const stateAsRef = toRefs(state);
    console.log(stateAsRef.foo); // ObjectRefImpl
    // 一、情形一，在toRefs分解后，改变foo和boo的值
    // 这种情形下，stateAsRef.foo和stateAsRef.boo都是Ref响应式对象（计算属性的返回值是ComputedRefImpl，这里toRefs分解reactive后的对象，
    // 属性是ObjectRefImpl），操作它的值，在setup中需要添加value
    setTimeout(() => {
      stateAsRef.foo += '==';
      // 正确用法
      // stateAsRef.foo.value += '==';
      stateAsRef.boo += '&&';
      // 正确用法
      // stateAsRef.boo.value += '&&';
      /**
       *
       * 更改foo boo 的值，没有执行的原因是：
       * 1.先对state进行了分解，此时stateAsRef.foo 和 stateAsRef.foo 都是 Ref对象
       * 在setup函数中，ef对象的值改变，需要使用value;即：
       * stateAsRef.foo.value+="==";
       * stateAsRef.boo.value+="&&";
       *
       */
      console.log('我没有执行的原因？');
    }, 2000);
    // 二、情形二，在改变值后，最后toRefs分解响应式对象
    // UseReatureX中有toRefs(state)操作，一旦toRefs后，后面的地方直接可以使用【属性名】来直接引用，比如第49行、50行的foo2，boo2
    const { foo2, boo2 } = UseReatureX();
    return {
      ...stateAsRef,
      foo2,
      boo2
    };
  }
});
function UseReatureX() {
  const state = reactive({
    foo2: 'a',
    boo2: 'b'
  });
  setTimeout(() => {
    state.foo2 += '==';
    state.boo2 += '&&';
  }, 2000);
  return toRefs(state);
}
</script>
