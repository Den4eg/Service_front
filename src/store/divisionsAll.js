import Auth from './authModule';

export default {
    modules: {
        auth: Auth,
    },
    state: {
        divisions: [],
    },
    actions: {
        DIVISIONS_GET: ({ commit }) => {
            fetch('http://localhost:3000/auth/getdivisions', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify({ test: 'test' }),
            })
                .then((resp) => resp.json())
                .then((j) => {
                    commit('divisionsWrite', j.data);
                })

                .catch((e) => console.log(e));
        },
    },
    mutations: {
        divisionsWrite: (state, payload) => {
            state.divisions.push([payload]);
        },
    },
    getters: {
        getAllDivisions: (state) => state.divisions,
        getUser: (state) => {
            return state.auth.user;
        },
    },
};
