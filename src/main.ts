import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from "./router/router.ts";
import store from "@/store";
const app= createApp(App);
// 注册路由
app.use(router);
// 注册vuex
app.use(store);
app.mount('#app');
