import jwt from 'jsonwebtoken';

export default {
    state: {
        user: {},
        mode: {
            loading: false,
            authStatus: false,
            errors: ''
        }
    },
    mutations: {
        loadingStatus_true: function (state) {
            state.mode.loading = true;
        },
        loadingStatus_false: function (state) {
            state.mode.loading = false;
        },
        authStatus_true: function (state, user) {
            state.mode.authStatus = true;
            state.user = user;
        },
        incoming_error: function (
            state, payload) {
            state.mode.errors = payload;
        },
        clear_errors: function (state) {
            state.mode.errors = ''
        },
        logout: function (state) {
            state.mode.authStatus = false;
            state.user = {}
            localStorage.removeItem('token')
        }
    },
    actions: {
        AUTH_TOKEN_REFRESH: function ({
            state,
            commit,
            dispatch
        }) {
            let decodedToken, storageToken = localStorage.getItem('token')
            if (storageToken) {
                decodedToken = jwt.decode(storageToken);
                state.user.token = storageToken;
                if (decodedToken.exp > Math.round(Date.now() / 1000)) {

                    if (!state.user.permission) {
                        dispatch('FETCH_USER_PROPS')
                    }
                    state.mode.authStatus = true;
                } else {
                    commit('logout')
                }
            }
        },
        AUTH_LOGIN: function ({
            state,
            commit
        }, payload) {
            commit('loadingStatus_true');
            return new Promise(resolve => {
                fetch('http://127.0.0.1:3000/auth/login', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify(payload)
                    })
                    .then(resp => resp.json())
                    .then(response => {
                        if (response.error) {
                            commit('incoming_error', response.error);
                            commit('loadingStatus_false');
                        } else {
                            localStorage.setItem('token', response.token);
                            state.user.token = response.token;
                            commit('loadingStatus_false');
                            resolve();
                        }
                    })
                    .catch(err => {
                        commit('incoming_error', 'Server error');
                        commit('loadingStatus_false');
                        console.log(err);
                    });
            });
        },
        FETCH_USER_PROPS: function ({
            state,
            commit
        }) {
            commit('loadingStatus_true')
            let token = state.user.token;
            fetch('http://127.0.0.1:3000/auth/user', {
                    headers: {
                        Auth: 'Bearer ' + token
                    },
                    method: 'POST'
                }).then(result => result.json())
                .then(response => {
                    commit('authStatus_true', response.user)
                    commit('loadingStatus_false');
                })
        }
    },
    getters: {
        loading_status: function (state) {
            return state.mode.loading;
        },
        isAuthenticated: function (state) {
            return state.mode.authStatus;
        },
        getUserProperties: function (state) {
            return state.user.permission || 0;
        },
        errData: function (state) {
            return state.mode.errors;
        }
    }
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
//         AUTH_REFRESH: ({
//             state,
//             commit,
//             dispatch
//         }) => {
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
//         AUTH_LOGIN: ({
//             commit
//         }, payload) => {
//             commit('AUTH_LOADING');

//             return new Promise(resolve => {
//                 axios({
//                         url: 'http://127.0.0.1:3000/auth/login',
//                         method: 'POST',
//                         data: payload
//                     })
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
//         AUTH_LOGOUT: function ({
//             commit
//         }) {
//             localStorage.removeItem('token');
//             commit('TOKEN_DATA', {
//                 login: '',
//                 exp: false
//             });
//         },
//         USER_PROPS_FETCH: function ({
//             commit
//         }, token) {
//             let user = jwt.decode(token);
//             console.log(user + ' fetch input data');

// fetch('http://127.0.0.1:3000/auth/user', {
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             token
//         })
//     })
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
//                         console.log('test dispatch');

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
//         USER_SAVE_PROPERTY: function (state, payload) {
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