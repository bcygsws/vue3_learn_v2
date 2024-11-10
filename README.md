# 项目 vue3_learn

## 一、创建 vue3 项目的两种方式

### 一、脚手架方式(vue ui 实质也是使用的是脚手架方式)，推荐使用 vue ui 界面化的方式

#### 1.1 只要全局安装了@vue/cli,vue ui 命令就生效了

#### 1.2 可视化创建 vue2 和 vue3 项目，都能实现，通用性更强，全是界面化操作

- 安装或者升级 npm install -g @vue/cli

- 保证 vue cli 版本在 4.5.0 以上;vue --version 或者 vue -V

- 创建项目 vue create my-project

### 二、vite 方式创建 vue3 项目

- [参考文档](https://blog.csdn.net/weixin_44647098/article/details/115519309?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0.pc_relevant_paycolumn_v3&spm=1001.2101.3001.4242.1&utm_relevant_index=3)
  #### create-react-app 的方式，已被抛弃
- create-vite-app 全局安装，然后 create-vite-app 项目名称
- 但是注意：全局安装 create-vite-app 时，会提醒这个插件已被抛弃：npm WARN deprecated create-vite-app@1.21.0: create-vite-app has been deprecated. run `npm init @vitejs/app` or `yarn create @vitejs/app` instead.

#### 运行 npm 命令的方式，npm @vitejs/app，推荐：每次安装，可以使用到最新的特性

- [npm init @vitejs/app 到底干了什么](https://blog.csdn.net/helloxiaoliang/article/details/117093912)
- 根据上面的文档，npm init @vitejs/app 等价于执行了 npx init @vitejs/create-app
- 参考 vite 官方文档[vite 官方文档](https://cn.vitejs.dev/guide/#index-html-and-project-root)
- 使用命令安装：npm create vite@latest my-vue-app -- --template vue，本机的 npm 版本是 7+，所以指定模板时，需要双短横线

##### npm 6.x

- npm create vite@latest my-vue-app --template vue
- 或者 npm init @vitejs/app my-vue-app --template vue
- 区别在于 npm create vite 和 npm init @vitejs/app,后面配置项目名称+vue 模板，方式是一样的

##### npm 7+, extra double-dash is needed:

- npm create vite@latest my-vue-app -- --template vue

##### yarn

- yarn create vite my-vue-app --template vue

##### pnpm

- pnpm create vite my-vue-app -- --template vue

## 二、vue2 和 vue3 数据响应式的实现原理的比较,实例：./setup_ref/Learn.vue

### vue2 的响应式

- 对象：是通过 defineProperty 对对象的属性值的读取和修改进行劫持（监视/拦截）
- 数组：通过重写数组的【更新数组的元素的一系列方法】来实现元素修改的劫持，例如：Array 的 unshift、push、pop、shift
- 等方法都需要重写
-
- 缺点：
- 1.添加和删除属性，页面不更新
- 2.通过下标更改元素值(arr[3]="更改元素值")或更新 length，页面不更新
-
-
- Object.defineProperty(data,"count",{
- get(){},
- set(){}
- })

### vue3 的数据响应式，Proxy 对属性的操作进行拦截，Reflect 对属性的操作进行处理

#### 一、通过 Proxy 代理：拦截 data 对任意属性的任意(13 种)操作，包括读取、更改、添加、删除属性等---属性操作拦截

- new Proxy(data,{
- get(target,prop){return Reflect.get(target,prop)}, // 拦截读取属性
- set(target,prop,value){return Reflect.set(target,prop,value)},// 拦截设置或添加新属性
- deleteProperty(target,prop){return Reflect.deleteProperty(target,prop)}, // 拦截删除属性
-
- })

#### 二、通过 Reflect 反射：动态地被代理对象(目标对象)进行特定的操作---属性操作处理

## 三、ref 和 reactive 的一些细节

- 1. ref 和 reactive 是 composition API 的两个响应式 API
- 2. ref 主要用基本数据类型的响应式，reactive 用于深度的响应式数据
- 3. ref 也可以处理对象和数组(在 setup 中要多加一个.value,而 reactive 方式不需要.value)，当 ref 中传入对象或数组时，系统内部会用 reactive 来处理它（打印 m3，能看到里面包含代理对象）
- 4. ref 内部是通过 getter/setter 来实现数据劫持的
- 5. proxy 内部通过 Proxy 对象拦截传入的属性对象的任何属性的任何操作（多达 13 种操作），通过反射对象 Reflect 来处理 Proxy 拦截的属性的操作
- 6. ref 在 setup 中处理时，const user=ref('dfaggfa');要添加一个 value(user.value 才能拿到值)，才能拿到值；在模板中处理它时，系统会自动加 value,不用带 value

## 四、setup 的一些注意问题

### setup 的执行时机

- setup 执行发生在 beforeCreate 和 created 之前，因此 setup 不能操作 data,methods,computed 等属性；只能操作 setup 固有的参数 props,attrs,slots,emit,expose 这五个属性
- 在 vue3 中 setup 被当做 vue2 中生命周期钩子 beforeCreate 和 created 使用，准确的说是顶替了这两个钩子的使用

### setup 的参数(props,{attrs,slots,emit,expose})

#### [setup 参数官方文档](https://www.javascriptc.com/vue3js/guide/composition-api-setup.html#%E4%B8%8A%E4%B8%8B%E6%96%87)

#### 响应式参数 props

- props 参数是响应式的，不能随便其进行解构，解构会丢失其响应式
- 强行解构它，用到另外一个对象，toRefs。toRefs 的作用是在不丢失响应式的前提下，分解响应式对象，这个对象的每一个属性都是一个 ref;我们知道 ref 也是响应式的-处理基本数据类型的响应式数据
- 强制解构举例：const user=reactive({name:\'\',age:\'\'}); const {name,age}=toRefs(user); name 和 age 就是两个 ref 了，在 setup 中操作数据，需要按照 ref 的用法，name.value,age.value 来进行读写操作

#### 有状态参数 attrs 和 slots

- 打印这两个对象，看到是 Prox 代理对象，它们是有状态的；会随着组件自身的更新而更新；因此要避免对它们解构，使用 attrs.x,slots.x 获取响应属性。context 上下文对象是一个普通的 js 对象，是非响应式的可以对其解构，解构成了{attrs,slots,emit}
- attrs 和 slots 是非响应式的，如果打算根据 attrs 和 slots 更改应用副作用，需要在生命周期钩子 onUpdated 中操作

#### 常用参数 emits，用来分发事件的

- 常用于子组件向父组件传值，类似 vue2 中的 this.$emit(父组件绑定的方法名称@emitxx,参数 val)

## 五、计算属性和监听

### 计算属性 computed

- 两种使用方式：
- getter 形式，监听变化不修改返回值。const fullName=computed(()=>{return user.firstName+"-"+user.lastName;})
- getter/setter，监听变化并修改返回值 const fullName=computed({
- get(){
-      return 返回监听数据fullName
- },
- set(val){
- // val 是变化的 fullName，它又影响别人
- }
- });
- getter/setter 这种形式的监听，具体应用场景：
- getter:就是总复选框，子列表中的复选框都选中了，总复选框必定选中；子列表复选框有一个没选中，总复选框就需要取消选中了
- setter:总复选框选中，子列表中所有复选框都要选中；总复选框取消，子列表中所有复选框取消

### 监听或者叫侦听属性 watch 和 watchEffect

- 1.watch 监听的是原因对象，而非结果对象，比如：要拿到一个 fullName,要根据 user 中的 firstName 和 lastName 作拼接；那么，user 要作为参数放在 watch 的第一个参数中，而要监听的结果对象是 fullName
- const fullName=ref('');
- watch(user,(value)=>{
- let arr=value.split('-'); // 参数 value 里面不用在.value 了，内部已经作了处理
- fullName.value=arr[0]+"-"+arr[1];
-
- })
- 2.watch 的第三参数声明两个特定属性：{immediate:true,deep:true},immediate 表示初始化时立即执行一次，deep 表示深度监视(不论数据对象的层级有多深)
- 3.watchEffect 写法更为简洁，不需要指定依赖的监视对象，操作什么响应式对象，就监视谁。而且默认会执行一次
- const fullName=ref('');
- watch(()=>{
-     fullName.value=user.firstName+"-"+user.lastName;
- })
- 4.watch 监视多个数据，必须使用数组，reactive 的属性，要使用函数形式，ref 对象则直接使用
- const fullName=ref('');
- const user=reactive({
  - firstName:'张',
  - lastName:'无忌'
-
- });
- watch([fullName,()=>user.firstName,()=>user.lastName],(val)=>{
- console.log(val);// 第一个参数的数组，顺序一一对应
- });

## 六、vue3 中组件通信的七种方式

### [参考文档](https://www.jb51.net/article/223816.htm#_label0)

### 1.父组件向子组件传值，v-bind 绑定子组件 props 接收

- Parent.vue :title="某变量"，子组件 Child.vue，props 属性接收 title，两种方式数组接收方式或者对象接收方式

### 2.子组件向父组件传值 emit

- vue3 版本低于 3.2,setup(props,{attrs,slots,emit}){
-
-
- }
- vue3.2 及其以上版本，可以使用 setup 语法糖
- props,emits 都需要从 vue 中按需引入，{defineProps,defineEmits}

### 3.ref/defineExpose 方式

- 适用于父组件获取子组件的属性或调用子组件的方法
- setup 语法糖中使用 defineExpose 暴露属性或方法，父组件才能使用。原因：通过 ref 获取的组件实例，不会暴露任何属性在\<script setup\>中，如果需要引用。需要手动导出这些属性或方法，以供父组件使用
- [参考文档 1：Vue3 的七种组件通信方式，别再说不会组件通信了](https://blog.csdn.net/qq_27318177/article/details/122967669)

### 4.attrs 实现组件通信

- attrs 中拿到的是父组件中传递的 style、class 除外的非 props 属性
- vue3.2 以后，使用 useAttrs
- vue3.2 以前的 vue3 版本，useContext.attrs();

### 5.v-model 方式，可以实多个数据的双向绑定

- 父组件中 v-model:list="list"
- 子组件中 props 接收，defineEmits 更改
- const emit=defineEmits(['list'])
- emit('update:list',新值)

### 6.provide/inject

- 唯一的区别在于，vue3 中 provide/inject 是响应式的了

### 7.vuex 状态管理器

- state、getters、mutations、actions 方式和原来 vue2 差别不大
- mapState 等映射对象的方式，需要自己封装一下 components/vuex/hook 文件夹下的封装
- hooks 中封装代码的基本思路：
  - 就是自己定义 useState,useGetters,useMutations,useActions，然后使用
  - useState 返回 return useStateMapper(mapper,mapperFn);mapper 是共享的 state 的属性组成的数据，mapperFn 是 mapState,如果使用了命名空间，需要使用 mapperFn=createNamespacedHelpers(moduleName).mapState;
  - useMapper.js 中声明 useStateMapper,useActionsMapper 等函数
- 命名空间：vuex 是单状态树，如果所有的状态都集中到一个对象上，这个对象可能会变得非常臃肿。vue 允许将 store 分成许多模块，每个模块拥有自己的 state,getters,mutations,actions,modules
- 命名空间中操作默认空间的数据的方式，[参考文档](https://blog.csdn.net/lzb348110175/article/details/89387495?spm=1001.2101.3001.6661.1&utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1.pc_relevant_paycolumn_v3&utm_relevant_index=1)
#### 参数 expose，新增

- expose 用于显式的限制暴露出的公共属性；父组件通过模板引用可以获取子组件中 expose({count})暴露出的那些属性

##### 细节-模板引用步骤

- 模板中，ref="myson"
- setup 中 const mySon=ref()，并使用 return 返回 mySon
- mySon.value.count 中就可以获取子组件暴露的属性 count

## Bug 修复

### Bug1:项目运行时，有警告

### 问题描述

- 项目运行后，有警告提示如下：
- warning Replace `↹` with `··` prettier/prettier
- 3:1 warning Replace `↹↹` with `····` prettier/prettier
- 4:1 warning Replace `↹` with `··` prettier/prettier
- 8:30 warning Replace `'vue-class-component'` with `"vue-class-component"` prettier/prettier
- 11:1 warning Replace `↹components:·{}` with `··components:·{},` prettier/prettier

### 解决

- 新建.prettierrc 文件
- 在对象中，统一生命 tabWidth:2; 即 tab 键为 2 个空格
