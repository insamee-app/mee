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
  setUser(state, user) {
    state.profile.user = user
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
      lastName: profile.last_name ?? '',
      firstName: profile.first_name ?? '',
      currentRole: profile.current_role ?? '',
      text: profile.insameeProfile.text ?? '',
      mobile: profile.mobile ?? '',
      skills: profile.insameeProfile.skills,
      focusInterests: profile.insameeProfile.focusInterests,
      associations: profile.insameeProfile.associations,
      graduationYear: profile.graduation_year ?? '',
      urlFacebook: profile.url_facebook ?? '',
      urlInstagram: profile.url_instagram ?? '',
      urlTwitter: profile.url_twitter ?? '',
    }
  },
}
