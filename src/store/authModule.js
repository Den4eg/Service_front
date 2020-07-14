import jwt from 'jsonwebtoken'

export default {
  state: {
    user: {},
    mode: {
      loading: false,
      authStatus: false,
      errors: '',
    },
  },
  mutations: {
    loadingStatus_true: function(state) {
      state.mode.loading = true
    },
    loadingStatus_false: function(state) {
      state.mode.loading = false
    },
    authStatus_true: function(state, user) {
      state.mode.authStatus = true
      state.user = user
    },
    incoming_error: function(state, payload) {
      state.mode.errors = payload
    },
    clear_errors: function(state) {
      state.mode.errors = ''
    },
    logout: function(state) {
      state.mode.authStatus = false
      state.user = {}
      localStorage.removeItem('token')
    },
  },
  actions: {
    AUTH_TOKEN_REFRESH: function({ state, commit, dispatch }) {
      let decodedToken,
        storageToken = localStorage.getItem('token')
      if (storageToken) {
        decodedToken = jwt.decode(storageToken)
        state.user.token = storageToken
        if (decodedToken.exp > Math.round(Date.now() / 1000)) {
          if (!state.user.permission) {
            dispatch('FETCH_USER_PROPS')
          }
          state.mode.authStatus = true
        } else {
          commit('logout')
        }
      } else {
        commit('logout')
      }
    },
    AUTH_REGISTER: function({ state, commit, dispatch }, payload) {
      fetch('http://127.0.0.1:3000/auth/register', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then((resp) => resp.json())
        .then((response) => {
          if (response.error) {
            commit('incoming_error', response.error)
            commit('loadingStatus_false')
          } else {
            localStorage.setItem('token', response.token)
            state.user.token = response.token
            commit('loadingStatus_false')
            dispatch('FETCH_USER_PROPS')
          }
        })
        .catch(() => {
          commit('incoming_error', 'Server error')
          commit('loadingStatus_false')
          commit('logout')
        })
    },
    AUTH_LOGIN: function({ state, commit }, payload) {
      commit('loadingStatus_true')

      return new Promise((resolve) => {
        fetch('http://127.0.0.1:3000/auth/login', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(payload),
        })
          .then((resp) => resp.json())
          .then((response) => {
            if (response.error) {
              commit('incoming_error', response.error)
              commit('loadingStatus_false')
              commit('logout')
            } else {
              localStorage.setItem('token', response.token)
              state.user.token = response.token
              commit('loadingStatus_false')
              resolve()
            }
          })
          .catch(() => {
            commit('incoming_error', 'Server error')
            commit('loadingStatus_false')
            commit('logout')
          })
      })
    },
    FETCH_USER_PROPS: function({ state, commit }) {
      commit('loadingStatus_true')
      fetch('http://127.0.0.1:3000/auth/user', {
        headers: {
          'Auth': 'Bearer ' + state.user.token,
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then((result) => result.json())
        .then((response) => {
          if (response.token) {
            commit('authStatus_true', response)
            commit('loadingStatus_false')
            commit('clear_errors')
          } else {
            commit('incoming_error', 'Bad user')
            commit('logout')
          }
        })
        .catch(() => {
          commit('logout')
        })
    },
  },
  getters: {
    loading_status: function(state) {
      return state.mode.loading
    },
    isAuthenticated: function(state) {
      return state.mode.authStatus
    },
    getUserProperties: function(state) {
      return state.user.permission || 0
    },
    getUserName: function(state) {
      return state.user.name
    },
    errData: function(state) {
      return state.mode.errors
    },
  },
}
