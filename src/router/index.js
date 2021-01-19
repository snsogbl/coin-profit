import Vue from 'vue'
import Router from 'vue-router'
var routerOpt = {
    // mode:'history',
    routes: [{
        path: '/login',
        component: resolve => {
            return require(['@/components/conf/login/login.vue'], resolve);
        },
        name: "登录",
        hidden: true
    }]
};
Vue.use(Router)
const router = new Router(routerOpt);

export
    default router