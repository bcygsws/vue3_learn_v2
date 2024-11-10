<template>
  <h3>这是Home组件</h3>
  <!-- setup和ref使用演示组件 -->
  <router-link to="/home/learn"
    >二、vue3响应式两个重要对象-ref和reactive
  </router-link>
  <router-link to="/home/update">三、操作代理数据，影响界面更新</router-link>
  <router-link to="/home/setup">四、setup的执行时机</router-link>
  <!-- 计算属性和监听 -->
  <router-link to="/home/computed"
    >五、计算属性和监听演示组件Computed
  </router-link>
  <router-link to="/home/version_reactive"
    >八、vue2和vue3响应式实现原理的对比
  </router-link>
  <!-- 浅劫持 -->
  <router-link to="/home/shallow_reactive"
    >九、浅监视或者浅劫持或者浅响应式
  </router-link>
  <!-- 只读和浅只读 -->
  <router-link to="/home/readonly"
    >十、readonly和shallowReadonly-只读和浅只读
  </router-link>
  <router-link to="/home/raw">十一、转换为普通对象，toRaw和markRaw</router-link>
  <!-- toRef的使用，和ref的区别 -->
  <router-link to="/home/to_ref">十二、演示toRef的用法</router-link>
  <!-- customRef的使用 -->
  <router-link to="/home/custom_ref">十三、演示customRef的使用</router-link>
  <!-- 祖孙组件传值provide/inject -->
  <router-link to="/home/provide_inject"
    >十四、provide/inject组孙组件传值
  </router-link>
  <!-- 使用Suspense标签 -->
  <router-link to="/home/suspense"
    >十六、Suspense标签为等待异步加载组件时提供后备内容
  </router-link>
  <router-link to="/home/v_model">十七、v-model实现双向通信</router-link>
  <router-link to="/home/vuex">十七、vuex的使用</router-link>
  <router-link to="/home/refs_comu">十八、vue组件通信之三-refs方法</router-link>
  <router-link to="/home/transition">十九、vue3内置组件transition</router-link>
  <router-link to="/home/async_suspense"
    >二十、vue3中定义异步组件和特殊组件Suspense
  </router-link>
  <router-view></router-view>
  <!-- <div class="home"> -->
  <!-- <h3>这是Home组件</h3> -->
  <!-- <p>{number}</p> -->
  <!-- 注意：在vue中使用模板是双括号，react中是单括号 -->
  <!-- <p>{{ number }}</p> -->
  <!-- start分支：setup和ref使用演示组件 -->
  <!-- <Learn></Learn> -->
  <!-- </div> -->
</template>

<script lang="ts">
// import Learn from '../components/setup_ref/Learn.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  // 注册一个子组件
  // components: {
  //   Learn
  // },
  setup() {
    // setup相当于一个回调函数，里面返回的任何对象，对象的属性和方法，在模板中可以直接使用
    let number = 16;
    return { number };
  }
});
</script>
