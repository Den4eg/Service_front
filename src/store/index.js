import Vue from 'vue';
import Vuex from 'vuex';
// import authModule from './authModule';
import transport from './transport';
import employeeCars from './employeeCars';
import divisionsAll from './divisionsAll';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        transport: transport,
        employeeCars: employeeCars,
        divisionsAll: divisionsAll,
    },
});
