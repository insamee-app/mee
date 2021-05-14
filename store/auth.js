export const state = () => ({
  user: undefined,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  login({ commit }, user) {
    commit('setUser', user)
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
