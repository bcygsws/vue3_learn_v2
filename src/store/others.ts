/**
 *
 * @ 接口约束必须有：
 * tsconfig.json中 strict:true
 * 要使用严格模式，原因是：ts的优势就在于类型系统，如果strict:false,是可以规避很多错误，但是这没有任何意义，写ts代码还和写js一样
 *
 * context上下文解构出来包含六个对象
 * {state,commit,dispatch,getters,rootState,rootGetters}
 * 
 * rootState,rootGetter是某个之命名空间，用于读取或操作默认空间里的state数据的
 * actions:{
 *    moduleAActions({state,commit,dispatch,getters,rootState,rootGetters}){
 * // do something
 *  }
 * 
 * }
 * 
 *
 */
interface IState {
  name: string;
  age: number;
  sex: string;
}
interface IContext {
  commit: (name: string, props: string) => void;
}
const moduleA = {
  // namespaced为true的作用是告诉vuex，该模块所有的state 、getters、mutations、actions
  // 里面的东西调用时都需要加上命名空间，这个命名空间就是该模块被import时命名的名字
  namespaced: true,
  state: {
    name: '楚留香',
    age: 32,
    sex: '男'
  },
  getters: {
    getName(state: IState) {
      return state.name;
    }
  },
  mutations: {
    remendName(state: IState, props: string) {
      state.name = props;
    }
  },
  actions: {
    setName(context: IContext, props: string) {
      context.commit('remendName', props);
    }
  }
};
export default moduleA;
