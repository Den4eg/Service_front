import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './authModule';
import transport from './transport';
import employeeCars from './employeeCars';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: authModule,
        transport: transport,
        employeeCars: employeeCars
    }
});
