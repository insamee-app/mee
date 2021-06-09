export const state = () => ({
  user: undefined,
})

export const mutations = {
  setUser(state, user) {
    if (!user) state.user = undefined
    else {
      state.user = user
    }
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
  loggedIn({ user }) {
    return !!user
  },
  socialNetworks({ user }) {
    return {
      facebook: user.url_facebook,
      instagram: user.url_instagram,
      twitter: user.url_twitter,
      téléphone: user.mobile,
    }
  },
  toUpdateUser({ user }) {
    return {
      last_name: user.last_name ?? '',
      first_name: user.first_name ?? '',
      current_role: user.current_role ?? '',
      text: user.text ?? '',
      mobile: user.mobile ?? '',
      skills: user.skills,
      focus_interests: user.focus_interests,
      associations: user.associations,
      graduation_year: user.graduation_year ?? '',
      url_facebook: user.url_facebook ?? '',
      url_instagram: user.url_instagram ?? '',
      url_twitter: user.url_twitter ?? '',
    }
  },
}
