// import jwt from 'jsonwebtoken';
// import axios from 'axios';

export default {
    state: {},
    mutations: {},
    actions: {},
    getters: {}
};

// export default {
//     state: {
//         token: localStorage.getItem('token') || '',
//         tokenExp: false,
//         error: '',
//         status: '',
//         userProperties: {}
//     },
//     actions: {
//         AUTH_REFRESH: ({ state, commit, dispatch }) => {
//             return new Promise((resolve, reject) => {
//                 if (state.token) {
//                     try {
//                         const userdata = jwt.decode(state.token);
//                         commit('TOKEN_DATA', userdata);
//                         dispatch('USER_PROPS_FETCH', state.token).then(() => {
//                             resolve('from refresh');
//                         });
//                     } catch (e) {
//                         commit('AUTH_ERROR', 'Invalid data');
//                         // commit('AUTH_LOGOUT');
//                         reject();
//                     }
//                 }
//             });
//         },
//         AUTH_LOGIN: ({ commit }, payload) => {
//             commit('AUTH_LOADING');

//             return new Promise(resolve => {
//                 axios({
//                     url: 'http://127.0.0.1:3000/auth/login',
//                     method: 'POST',
//                     data: payload
//                 })
//                     .then(response => {
//                         if (response.data.error) {
//                             commit('AUTH_ERROR', response.data.error);
//                         } else {
//                             localStorage.setItem('token', response.data.token);
//                             commit('AUTH_TOKEN', response.data.token);
//                             resolve(response.data.token);
//                             commit('AUTH_SUCCESS');
//                         }
//                     })
//                     .catch(err => {
//                         commit('AUTH_ERROR', 'Server error');
//                         console.log(err);
//                     });
//             });
//         },
//         AUTH_LOGOUT: ({ commit }) => {
//             localStorage.removeItem('token');
//             commit('TOKEN_DATA', { login: '', exp: false });
//         },
//         USER_PROPS_FETCH: function({ commit }, token) {
//             console.log(user + ' fetch input data');
//             let user = jwt.decode(token);
//             fetch('http://127.0.0.1:3000/auth/user', {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 method: 'POST',
//                 body: JSON.stringify({ user })
//             })
//                 // axios({
//                 //     url: 'http://127.0.0.1:3000/auth/user',
//                 //     method: 'POST',
//                 //     data: { user },
//                 //     headers: { 'Content-Type': 'application/json', Accept: '*' }
//                 // })
//                 .then(response => {
//                     console.log(response.data.user);
//                     if (response.data.error) {
//                         commit('AUTH_ERROR', response.data.error);
//                     } else {
//                         commit('USER_SAVE_PROPERTY', response.data.user);
//                     }
//                 })
//                 .catch(() => {
//                     commit('AUTH_ERROR', 'Server error');

//                     console.log('pizda');
//                 });
//         }
//     },
//     mutations: {
//         AUTH_LOADING: state => {
//             state.status = 'loading';
//         },
//         AUTH_ERROR: (state, payload) => {
//             state.error = payload;
//             state.status = 'error';
//         },
//         AUTH_SUCCESS: state => {
//             state.status = 'success';
//             state.error = '';
//         },
//         AUTH_LOGOUT: state => {
//             state.userProperties = {};
//             state.token = '';
//         },
//         AUTH_TOKEN: (state, payload) => {
//             state.token = payload;
//         },
//         TOKEN_DATA: (state, payload) => {
//             const timeExp = Math.round(Date.now() / 1000);
//             state.tokenExp = payload.exp > timeExp;
//         },
//         USER_SAVE_PROPERTY: function(state, payload) {
//             state.userProperties = payload;
//         }
//     },
//     getters: {
//         getUserProperties: state => {
//             return state.userProperties;
//         },
//         isAuth: state => {
//             return state.token;
//         },
//         errData: state => {
//             return state.error;
//         },
//         tokenExp: state => {
//             return state.tokenExp;
//         },
//         fetch_status: state => {
//             return state.status;
//         }
//     }
// };
