Vue.config.productionTip = false

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './route'
import store from './store'

import Vuelidate from 'vuelidate'
import Maska from 'maska'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
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

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_',
    },
  }),
)

Vue.use(Maska)
Vue.use(Vuelidate)
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
  sockets: {
    connect: function() {
      console.log('socket connected')
    },
    customEmit: function(data) {
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
  },
})
