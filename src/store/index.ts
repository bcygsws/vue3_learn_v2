import {createStore} from 'vuex';
import moduleA from './others';

/**
 *
 * @ vuex中命名空间的使用
 * namespaced:true
 *
 *
 */
export interface IState {
    count: number;
    name: string;
    age: number;
    sex: string;
}

export default createStore({
    state: {
        count: 0,
        name: '张衡',
        age: 13,
        sex: '男'
    },
    getters: {
        getData(state: IState) {
            return state.count;
        },
        getName(state: IState) {
            return state.name;
        }
    },
    mutations: {
        inc(state: IState, props: any) {
            state.count += props.step;
        },
        dec(state: IState, props: any) {
            state.count -= props.step;
        },
        remendName(state: IState, props: any) {
            state.name = props;
        }
    },
    actions: {
        decAction(context: any, props: any) {
            context.commit('dec', props);
        },
        // 改名的Actions方法
        setName(context: any, props: any) {
            context.commit('remendName', props);
        }
    },
    modules: {
        // 使用了命名空间,导入时名称为moduleA,这就是命名空间的名字
        moduleA
    }
});
