Vue.config.productionTip = false

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './route'
import store from './store'

import Vuelidate from 'vuelidate'
import Maska from 'maska'
//=================== fetch interceptors =====================

// (function() {
//     let originalFetch = fetch;
//     fetch = function() {
//         return originalFetch.apply(this, arguments).then(function(data) {
//             someFunctionToDoSomething();
//             return data;
//         });
//     };
// })();

//=================== fetch interceptors =====================

Vue.use(Maska)
Vue.use(Vuelidate)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
