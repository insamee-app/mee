export const state = () => ({
  profile: undefined,
})

export const mutations = {
  setProfile(state, profile) {
    if (!profile) state.profile = undefined
    else {
      state.profile = profile
    }
  },
}

export const actions = {
  login({ commit }, profile) {
    commit('setProfile', profile)
  },
  logout({ commit }) {
    commit('setProfile', undefined)
  },
}

export const getters = {
  loggedIn({ profile }) {
    return !!profile
  },
  socialNetworks({ profile }) {
    return {
      facebook: profile.url_facebook,
      instagram: profile.url_instagram,
      twitter: profile.url_twitter,
      téléphone: profile.mobile,
    }
  },
  toUpdateProfile({ profile }) {
    return {
      last_name: profile.last_name ?? '',
      first_name: profile.first_name ?? '',
      current_role: profile.current_role ?? '',
      text: profile.text ?? '',
      mobile: profile.mobile ?? '',
      skills: profile.skills,
      focus_interests: profile.focus_interests,
      associations: profile.associations,
      graduation_year: profile.graduation_year ?? '',
      url_facebook: profile.url_facebook ?? '',
      url_instagram: profile.url_instagram ?? '',
      url_twitter: profile.url_twitter ?? '',
    }
  },
}
