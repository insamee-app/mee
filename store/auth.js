export const state = () => ({
  user: undefined,
  // isLogged: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  // setLoggedIn(state, logged) {
  //   state.isLogged = logged
  // },
}

export const actions = {
  login({ commit }, user) {
    commit('setUser', user)
    // commit('setLoggedIn', true)
  },
  logout({ commit }) {
    commit('setUser', undefined)
  },
}

export const getters = {
  loggedIn(state) {
    return !!state.user
  },
}
