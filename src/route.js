import VueRouter from 'vue-router';
import Journal from './components/pages/AppJournal';
import Welcome from './components/pages/Welcome';
import Auth from './components/pages/Auth';
import store from './store';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Welcome,
            meta: { ifAuthenticated: true },
            beforeEnter: (to, from, next) => {
                if (store.getters.isAuth && store.getters.tokenExp) {
                    next();
                } else {
                    next('/auth');
                }
            }
        },
        {
            path: '/auth',
            component: Auth,
            beforeEnter: (to, from, next) => {
                if (store.getters.isAuth && store.getters.tokenExp) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            name: 'journal',
            path: '/journal',
            component: Journal,
            meta: { ifAuthenticated: true }
        },
        {
            name: 'history',
            path: '/history',
            component: Welcome,
            meta: { ifAuthenticated: true }
        },
        {
            name: 'visitors',
            path: '/visitors',
            component: Welcome,
            meta: { ifAuthenticated: true }
        }
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    store.dispatch('USER_PROPS_FETCH', localStorage.getItem('token'));
    if (to.matched.some(res => res.meta.ifAuthenticated)) {
        if (!store.getters.isAuth || !store.getters.tokenExp) {
            store.dispatch('AUTH_LOGOUT');
            next('/auth');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
