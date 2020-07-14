import authModule from './authModule'

export default {
  modules: {
    auth: authModule,
  },
  state: {
    divisions: [],
  },
  actions: {
    DIVISIONS_GET: ({ commit }) => {
      return new Promise((resolve) => {
        fetch('http://localhost:3000/auth/getdivisions')
          .then((resp) => resp.json())
          .then((d) => {
            commit('divisionsWrite', d.data)
            resolve()
          })
          .catch((e) => console.log(e))
      })
    },
  },
  mutations: {
    divisionsWrite: (state, payload) => {
      state.divisions = payload
    },
  },
  getters: {
    getAllDivisions: (state) => state.divisions,
    getUser: (state) => {
      return state.auth.user
    },
  },
}
