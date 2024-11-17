/**
 * vue3+ts vite构建项目，路由配置
 *
 * */
import {createRouter, createWebHistory} from 'vue-router';
import Home from '@/views/Home.vue';
import Learn from '@/components/setup_ref/Learn.vue';
import Update from '@/components/update/Update.vue';
import Fat from '@/components/setup/Fat.vue';
// 计算属性和监听
import Computed from '@/components/computed/Computed.vue';
// 自定义hook
import DefineHook from '@/components/hook/DefineHook.vue';
import FatLife from '@/components/life/FatLife.vue';
import Base from '@/components/to_refs/Base.vue';
import VersionReactive from '@/components/reactive/VersionReactive.vue';
import ShallowReactive from '@/components/shallow_reactive/ShallowReactive.vue';
// 只读和浅只读
import ReadOnlyProperty from '@/components/readonly/ReadOnlyProperty.vue';
import ToAndMarkRaw from '@/components/raw/ToAndMarkRaw.vue';
import ToRef from '@/components/to_ref/ToRef.vue';
import CustomRef from '@/components/custom_ref/CustomRef.vue';
import Sus from '@/components/suspense/Sus.vue';
import Father from '@/components/v_model/Father.vue';
import ProInj from '@/components/provide_inject/ProInj.vue';
import MyFat from '@/components/refs_comu/MyFat.vue';
import VuexFat from '@/components/vuex/VuexFat.vue';
import AttrsFat from '@/components/attrs/AttrsFat.vue';
import Transition from '@/components/transition/Transition.vue';
import DefineClass from '@/components/transition/DefineClass.vue';
import TransitionLife from '@/components/transition/TransitionLife.vue';
import SomeWay from '@/components/transition/SomeWay.vue';
import UsingGSAP from '@/components/transition/UsingGSAP.vue';
import UsingAnimate from '@/components/transition/UsingAnimate.vue';
import TransitionGroup from '@/components/transition/TransitionGroup.vue';
import RandomNum from '@/components/transition/RandomNum.vue';
import GSAPWatch from '@/components/transition/GSAPWatch.vue';
import AsyncFat from '@/components/async_suspense/AsyncFat.vue';
import RefImpl from '@/components/setup_ref/RefImpl.vue';

import Page from '@/components/transition/cross-component-animation/Page.vue';
import Page1 from '@/components/transition/cross-component-animation/Page1.vue';
import Page2 from '@/components/transition/cross-component-animation/Page2.vue';
import ModalButton from "@/components/teleport/ModalButton.vue";

const routes = [
    {
        path: '/',
        component: Home,
        children: [
            {
                component: Learn,
                path: '/home/learn',
                children: [
                    {
                        path: '/home/learn/ref_impl',
                        component: RefImpl
                    }
                ]
            },
            {
                path: '/home/update',
                component: Update
            },
            {
                path: '/home/setup',
                component: Fat
            },
            {
                path: '/home/computed',
                component: Computed
            },
            {
                path: '/home/version_reactive',
                component: VersionReactive
            },
            {
                path: '/home/shallow_reactive',
                component: ShallowReactive
            },
            {
                path: '/home/readonly',
                component: ReadOnlyProperty
            },
            {
                path: '/home/raw',
                component: ToAndMarkRaw
            },
            {
                path: '/home/to_ref',
                component: ToRef
            },
            {
                path: '/home/custom_ref',
                component: CustomRef
            },
            {
                path: '/home/provide_inject',
                component: ProInj
            },
            {
                path: '/home/suspense',
                component: Sus
            },
            {
                path: '/home/v_model',
                component: Father
            },
            {
                path: '/home/refs_comu',
                component: MyFat
            },
            {
                path: '/home/vuex',
                component: VuexFat
            },
            {
                path: '/home/attrs',
                component: AttrsFat
            },
            {
                path: '/home/async_suspense',
                component: AsyncFat
            },
            {
                path: '/home/transition',
                component: SomeWay,
                children: [
                    {
                        path: '/home/transition/tr_name',
                        component: Transition
                    },
                    {
                        path: '/home/transition/define_class',
                        component: DefineClass
                    },
                    {
                        path: '/home/transition/life',
                        component: TransitionLife
                    },
                    {
                        path: '/home/transition/use_gsap',
                        component: UsingGSAP
                    },
                    {
                        path: '/home/transition/use_animate',
                        component: UsingAnimate
                    },
                    {
                        path: '/home/transition/tr_group',
                        component: TransitionGroup
                    },
                    {
                        path: '/home/transition/random_num',
                        component: RandomNum
                    },
                    {
                        path: '/home/transition/gsap_watch',
                        component: GSAPWatch
                    },
                    {
                        path: "/home/transition/cross_component_animation",
                        component: Page,
                        children: [
                            {
                                path: "/home/transition/cross_component_animation/page1",
                                name: 'Page1',
                                component: Page1
                            },
                            {
                                path: "/home/transition/cross_component_animation/page2",
                                name: 'Page2',
                                component: Page2
                            },
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/about',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue'),
        children: [
            {
                path: 'hook',
                component: DefineHook
            },
            {
                path: 'fat_life',
                component: FatLife
            },
            {
                path: 'to_refs',
                component: Base
            },
            {
                path: 'teleport',
                component: ModalButton
            }
        ]
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;