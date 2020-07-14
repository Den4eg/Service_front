import VueRouter from 'vue-router'
import store from './store'
//        Pages
import Welcome from './components/pages/Welcome'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import History from './components/pages/history/History'
import Visitors from './components/pages/visitors/Visitors'
import Admin from './components/pages/admin/admin.main'
import AppJournal from '@/components/pages/journal/AppJournal'

const router = new VueRouter({
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //     ALL Routes must have Names
  routes: [
    {
      name: 'root',
      path: '/',
      component: Welcome,
      meta: {
        ifAuthenticated: true,
      },
    },
    { name: 'auth', path: '/auth', component: Login },
    {
      name: 'register',
      path: '/register',
      component: Register,
    },
    {
      name: 'journal',
      path: '/journal',
      component: AppJournal,
      meta: {
        ifAuthenticated: true,
      },
    },

    {
      name: 'history',
      path: '/history',
      component: History,
      meta: {
        ifAuthenticated: true,
      },
    },
    {
      name: 'visitors',
      path: '/visitors',
      component: Visitors,
      meta: {
        ifAuthenticated: true,
      },
    },
    {
      name: 'admin',
      path: '/admin',
      component: Admin,
      meta: {
        ifAuthenticated: true,
      },
    },
  ],
  mode: 'history',
})
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     ALL Routes must have Names
router.beforeEach((to, from, next) => {
  store.commit('clear_errors')
  store.dispatch('AUTH_TOKEN_REFRESH')
  if (to.matched.some((res) => res.meta.ifAuthenticated)) {
    if (!store.getters.isAuthenticated) {
      store.commit('logout')
      next('/auth')
    } else {
      next()
    }
  } else {
    next()
  }
})
const getDivisions = () => {
  store.dispatch('DIVISIONS_GET')
  // .then(console.log(store.getters.getUserProperties))
}

const errorListener = (err) => {
  console.log(err.name)
}
router.onReady(getDivisions, errorListener)

export default router
