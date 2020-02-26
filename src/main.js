/* eslint-disable */
Vue.config.productionTip = false;

import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import router from './route';
import store from './store';

import Vuelidate from 'vuelidate';

//test Maska


import Maska from 'maska'
Vue.use(Maska)


//test Maska



Vue.use(Vuelidate);
Vue.use(VueRouter);

// export const eventEmiter = new Vue({
//     data: function() {
//         return {
//             userDetails: {
//                 login: null,
//                 name: null,
//                 tabNumber: null,
//                 phoneInternal: null,
//                 division: null,
//                 permission: 9
//             }
//         };
//     }
// });

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});