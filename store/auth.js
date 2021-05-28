import { camelCase } from 'change-case'

export const state = () => ({
  user: undefined,
})

export const mutations = {
  setUser(state, user) {
    if (!user) state.user = undefined
    else {
      const camelUser = {}
      for (const field in user) {
        camelUser[camelCase(field)] = user[field]
      }
      state.user = camelUser
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
      facebook: user.urlFacebook,
      instagram: user.urlInstagram,
      twitter: user.urlTwitter,
      téléphone: user.mobile,
    }
  },
  toUpdateUser({ user }) {
    return {
      lastName: user.lastName ?? '',
      firstName: user.firstName ?? '',
      currentRole: user.currentRole ?? '',
      text: user.text ?? '',
      mobile: user.mobile ?? '',
      skills: user.skills,
      focusInterests: user.focusInterests,
      associations: user.associations,
      graduationYear: user.graduationYear ?? '',
      urlFacebook: user.urlFacebook ?? '',
      urlInstagram: user.urlInstagram ?? '',
      urlTwitter: user.urlTwitter ?? '',
    }
  },
}
