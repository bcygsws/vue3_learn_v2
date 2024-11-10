import { createStore } from 'vuex';
import moduleA from './others';
/**
 *
 * @ vuex中命名空间的使用
 * namespaced:true
 *
 *
 */

export default createStore({
  state: {
    count: 0,
    name: '张衡',
    age: 13,
    sex: '男'
  },
  getters: {
    getData(state) {
      return state.count;
    },
    getName(state) {
      return state.name;
    }
  },
  mutations: {
    inc(state, props) {
      state.count += props.step;
    },
    dec(state, props) {
      state.count -= props.step;
    },
    remendName(state, props) {
      state.name = props;
    }
  },
  actions: {
    decAction(context, props) {
      context.commit('dec', props);
    },
    // 改名的Actions方法
    setName(context, props) {
      context.commit('remendName', props);
    }
  },
  modules: {
    // 使用了命名空间,导入时名称为moduleA,这就是命名空间的名字
    moduleA
  }
});
