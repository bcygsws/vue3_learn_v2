<template>
  <h3>五、计算属性和监听演示组件Computed</h3>
  <form>
    <!-- fieldset用于给表单数据分组 -->
    <fieldset>
      <legend>姓名操作：</legend>
      姓氏：<input
        type="text"
        name="name"
        placeholder="请输入姓氏"
        id="name"
        v-model="firstName"
      /><br />
      名字：<input
        type="text"
        name="intr"
        placeholder="请输入名字"
        id="intr"
        v-model="lastName"
      /><br />
    </fieldset>
    <fieldset>
      <legend>计算属性和监视的演示：</legend>
      <!--显示姓名：<input-->
      <!--  type="text"-->
      <!--  placeholder="显示姓名"-->
      <!--  v-model="fullName1"-->
      <!--/><br />-->
      fullName2显示姓名：<input
        type="text"
        placeholder="显示姓名"
        v-model="fullName2"
      /><br />
      fullName3显示姓名：<input
        type="text"
        placeholder="显示姓名"
        v-model="fullName3"
      /><br />
      fullName4显示姓名：<input
        type="text"
        placeholder="显示姓名"
        v-model="fullName4"
      /><br />
      fullName5显示姓名：<input
        type="text"
        placeholder="显示姓名"
        v-model="fullName5"
      /><br />
      <div v-for="(item, index) in pwd.pwdArr" :key="index">
        <span>密码{{ index + 1 }}:</span>
        <input type="text" v-model="item.password" /><br />
      </div>
      <!-- disabled="true"或者disabled="false"按钮都被禁用了，disabled失效了；尝试用js的方式控制按钮的使用或禁用 :disable="isReset"-->
      <input type="button" value="重置" :disabled="pwd.isReset" /><br />
    </fieldset>
  </form>
</template>
<script lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  toRefs,
  defineComponent
} from 'vue';
/**
 * @desc:总结
 * vue中watch(watchEffect)和computed的比较：
 * computed:
 * 1.computed是计算属性，有缓存功能，默认走缓存，性能会更好
 * 2.当依赖的数据发生改变（dirty：true），才重新计算；其底层维护了一个
 * dirty变量，当依赖的数据发生变化时，dirty变量变为true；否则为false
 * 3.computed不能用于异步的场景
 * 4.computed有getter/setter功能，实现数据监视的主体置换
 * 例如：firstName，lastName计算出fullName
 * 同时，设置set可以实现，fullName变化影响firstName，lastName
 *
 * watch/watchEffect:
 * 1.watch是侦听属性，没有缓存功能
 * 2.watch能实现异步功能或者比较复杂的场景（例如：watch可以同时监听多个
 * 对象）
 * 3.watch有惰性，只有在数据发生变化时才执行回调函数，否则不执行；
 * watchEffect没有惰性，默认会执行一次回调函数
 *
 * */

export default defineComponent({
  name: 'Computed',
  setup() {
    /*
     * @在组合式API中，如何定义name属性
     * 方式一：
     * 增加一对标签，<script lang="ts">export default {name:"Computed"}</关闭标签script>
     *
     * 方式二：
     * 1.安装插件：unplugin-vue-define-options
     * npm install unplugin-vue-define-options  --save
     *
     * 2.就可以在当前项目中使用@defineOptions，无需再在script标签中写export default
     *
     * 方式三：
     * 使用defineComponent({
     * name:'Computed'
     *
     * })
     *
     * 方式四：
     * <script vite-plugin-vue-setup-extend  lang="ts" setup name="Computed">
     *
     * */

    // -字符按照"-横线"劈开，得到两个空字符组件的数组
    console.log('-'.split('-')); // ['','']
    const user = reactive({
      firstName: '东方',
      lastName: '不败'
    });
    console.log(user.firstName);
    console.log(user.lastName);
    // 演示监听多个数据
    const pwd = reactive({
      pwdArr: [
        {
          password: '',
          text: '请输入不少于16个字符'
        },
        {
          password: '',
          text: '请输入修改的密码'
        }
      ],
      // 控制重置按钮的能否使用
      isReset: true,
      // 原密码框和修改密码框中的值;passVals是一个ComputedImplRef,和ref定义的ImplRef略有不同；所以watch监听
      // 下面watch监听pwdPassVals数组时，仍然需要使用watch(()=>pwd.pwdPassVals)
      passVals: computed(() => getArr())
    });
    const getArr = (): string[] => {
      let myArr = pwd.pwdArr.map((item) => {
        return item.password;
      });
      // 返回密码数组
      return myArr;
    };
    /**
     *
     * watch监听密码框数组passVals
     * 1.pwd.passVals是计算属性computed得到的，它返回的是ComputedImplRef；不是ref定义的ImplRef；所以watch监听多个数据时，使用了
     * 函数形式：()=>pwd.passVals
     * 2.pwd.passVals数据格式为：['密码1','密码2']
     * 所以，监听其中的两个元素的参数写成[newVal1,newVal2]:像分别解构一样
     * 3.因为修改密码时，原密码和新密码都不能为空；只要有一个为空，将重置按钮设置为不可用，以示提醒（修改的密码不能为空）
     *
     */
    watch(
      () => pwd.passVals,
      ([newVal1, newVal2]) => {
        if (newVal1 !== '' && newVal2 !== '') {
          pwd.isReset = false;
        } else {
          pwd.isReset = true;
        }
      },
      { immediate: true, deep: true }
    );

    // 只有getter的计算属性,一个回调；如果是getter+setter的计算属性，回调函数被{get(){},set(){}}取代
    /**
     *
     * @ 一、computed和watch计算和侦听属性中引用setup中定义的响应式对象
     *
     * 1.1计算和侦听属性中引用setup中定义的数据（如：computed中引用user.firstName和user.lastName）
     * 中，一个是空字符和undefined
     * 1.2原因是：data、props、methods、computed和watch初始化发生在beforeCreate和created两个钩子
     * 之间;而setup在beforeCreate之前执行
     *
     */
    // const fullName1 = computed(() => {
    //   console.log(user.firstName); // 空字符''
    //   console.log(user.lastName); // undefined
    //   return user.firstName + '-' + user.lastName;
    // });
    // console.log(fullName1); // 打印一个ComputedRefImpl，可以验证Vue3中computed的返回值是一个ComputedRefImpl
    /*
    ComputedRefImpl{dep:undefined,__v_isRef:true,_dirty:true,effect:ReactiveEffect,_setter:ƒ,…}
    dep:Set(1){ReactiveEffect}
    effect:ReactiveEffect{active:true,deps:Array(2),parent:undefined,fn: ƒ,scheduler:ƒ,…}
    __v_isReadonly: true
    __v_isRef:true
    _cacheable:true
    _dirty:false
    _setter:() => {…}
    _value:"东方-不败"
    value:(...)
    [[Prototype]]:Object
    */
    // 特殊情况：带getter和setter的计算属性
    const fullName2 = computed({
      get() {
        return user.firstName + '-' + user.lastName;
      },
      // val的值，就是get中return的值，自然val参数的类型也是string
      set(val: string) {
        let arr = val.split('-');
        console.log(val);
        user.firstName = arr[0];
        user.lastName = arr[1];
      }
    });
    // 使用watch监听时，fullName3得自己定义一下，字符串是基本类型fullName3定义为
    let fullName3 = ref('');
    // watch方式一、使用watch的两个特性来监听，如果数据层次很深，只监视外层的数据,此处监视user,user中有多个属性
    // 1.深度监听 deep:true; 默认值false
    // 2.初始化立即执行 immediate:true; 默认值为false
    // a.watch回调中不使用参数
    // watch(
    //   user,
    //   () => {
    //     fullName3.value = user.firstName + "-" + userF.lastName;
    //   },
    //   {
    //     immediate: true, // 初始化时立即执行一次，设为true
    //     deep: true, // 深度监听
    //   }
    // );
    // b.watch回调中使用参数
    // 方式一
    // watch(user, (p) => {
    //   fullName3.value = p.firstName + '-' + p.lastName;
    // });

    // 方式二,本案例不涉及深度监听或初始化时立即执行
    // watch(
    //   user,
    //   (p) => {
    //     fullName3.value = p.firstName + '-' + p.lastName;
    //   },
    //   {
    //     immediate: true, // 初始化时立即执行一次，设为true
    //     deep: true // 深度监听
    //   }
    // );

    // 方式三
    // 3.1 转换成watchEffect的形式,不用配置，默认会进行监视，而且只执行一次
    // 3.2 不需要设置监听对象；原因数据，就是要监听的对象；从上下文中可以读取，fullName3是由user控制；user就是隐藏的被监听对象
    watchEffect(() => {
      fullName3.value = user.firstName + '-' + user.lastName;
    });
    // watch方式二、监听一个数据，fullName4发生改变时，反过来影响firstName和lastName
    /**
     *
     * watch和watchEffect转换时，注意
     * watch时，watch内有两个参数
     * watch(要监视的变量fullName4或数组,(val){
     * // 带参数的回调，这里的val=fullName4.value,参数已经.value过了
     * })
     *
     * 转换成watchEffect()时，只有一个参数，这个参数是回调函数cb,回调函数cb不含参数，要监视的数据来源对象fullName4
     * 直接现在回调中
     * watchEffect(()=>{
     *   let arr=fullName4.value.split('-');// 注意使用的是fullName4
     *   user.firstName=arr[0];
     *   user.lastName=arr[1];
     *
     * })
     *
     */
    let fullName4 = ref('');
    // 测试时，fullName4的值，变化影响firstName和lastName
    watch(fullName4, (val) => {
      let arr = val.split('-');
      user.firstName = arr[0];
      user.lastName = arr[1];
    });
    /**
     * @二、上面用watchEffect进行等效
     * 2.1.watchEffect不用配置监视对象回调中使用哪些数据，就监视这些数据，默认执行一次
     * 也即：watchEffect省去了 起因数据user这个第一个参数
     *
     * 2.2.同时，第三个参数{immediate:true,deep:true}也省去了
     * watchEffect监视默认会执行一次，实现watch中immediate：true的作用
     *
     *
     */
    // 收集要监视的对象，一对多，fullName4是引起变化的数据，firstName和lastName是监听数据
    // watchEffect(() => {
    //   let arr = fullName4.value.split("-");
    //   user.firstName = arr[0];
    //   user.lastName = arr[1];
    // });
    let fullName5 = ref('');
    // watch方式三、监听多个数据
    watch([fullName5, () => user.firstName, () => user.lastName], (val) => {
      /**
       * @ 三、Vue3中使用数组作为监控对象，watch可以监听多个数据
       * 参考文档：结合应用，理解watch监听多个数据的应用场景
       * https://blog.csdn.net/qq_50950033/article/details/125632885
       *
       * 1.监听多个数据，必须使用数组，数组中依次写入多个被监测的数据
       * 2.在这个数组中，如果是ref对象，直接使用
       * 3.在这个数组中，如果是reactive对象里的属性，要使用函数的形式()=>user.firstName
       * 4.cb中的参数，也是数组；本例子中的val
       * val打印出来是一个数组
       * val数组中第一个参数是fullName5，第二个参数firstName,第三个参数是lastName
       *
       *
       */
      console.log(val);
    });
    // user用toRefs解构出来，模板中引用更简单。模板中user.firstName和user.lastName都可以
    // 使用firstName和lastName直接引用

    let { firstName, lastName } = toRefs(user);
    return {
      // fullName1,
      fullName2,
      fullName3,
      fullName4,
      fullName5,
      firstName,
      lastName,
      pwd
    };
  }
});
</script>
