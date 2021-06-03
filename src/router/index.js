import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

Vue.use(VueRouter);

const lazyLoad = (view) => {
    return () => import(`@/views/${view}.vue`);
}

const routes = [
    {
        path: '/',
        name: 'PageHome',
        alias: '/home/',
        component: lazyLoad('PageHome'),
        pathToRegexpOptions: { strict: true } 
    },
    {
        path: '/login/',
        name: 'PageLogin',
        component: lazyLoad('PageLogin'),
        pathToRegexpOptions: { strict: true } 
    },
    {
        path: '/signup/',
        name: 'PageSignup',
        component: lazyLoad('PageSignup'),
        pathToRegexpOptions: { strict: true } 
    },
    {
        path: '/news/',
        name: 'PageNews',
        component: lazyLoad('PageNews'),
        pathToRegexpOptions: { strict: true } 
    },
    {
        path: '/user/',
        name: 'PageUser',
        component: lazyLoad('PageUser'),
        pathToRegexpOptions: { strict: true } 
    },
    {
        path: '/*',
        redirect: '/'
    }
];

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (store.getters.isStored) return next();
    store.dispatch('search');
    next();
});

export default router;
