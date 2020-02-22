import VueRouter from 'vue-router';
import Journal from './components/pages/AppJournal';
import Welcome from './components/pages/Welcome';
import Auth from './components/pages/Auth';
import store from './store';

const router = new VueRouter({
    routes: [{
            path: '/',
            component: Welcome,
            meta: {
                ifAuthenticated: true
            }
        },
        {
            path: '/auth',
            component: Auth
        }, {
            name: 'test',
            path: '/test',
            component: Welcome
        },
        {
            name: 'journal',
            path: '/journal',
            component: Journal,
            meta: {
                ifAuthenticated: true
            }
        },
        {
            name: 'history',
            path: '/history',
            component: Welcome,
            meta: {
                ifAuthenticated: true
            }
        },
        {
            name: 'visitors',
            path: '/visitors',
            component: Welcome,
            meta: {
                ifAuthenticated: true
            }
        }
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {
    store.dispatch('AUTH_TOKEN_REFRESH')
    if (to.matched.some(res => res.meta.ifAuthenticated)) {
        if (!store.getters.isAuthenticated) {
            store.commit('logout')
            next('/auth');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;