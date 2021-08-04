export const state = () => ({
  skills: [],
  focusInterests: [],
  associations: [],
  currentRoles: [
    { id: 'étudiant', name: 'étudiant' },
    { id: 'personnel', name: 'personnel' },
  ],
  reasonsProfiles: [],
})

export const mutations = {
  set(state, { name, value }) {
    state[name] = value
  },
}

export const actions = {
  async fetch({ state, commit }, name) {
    const endpoint = name.includes('reasons')
      ? '/api/v1/reasons?platform=insamee'
      : `/api/v1/${name}?serialize=filter`
    if (!state[name].length) {
      const { data } = await this.$axios.get(endpoint)
      commit('set', { name, value: data })
    }
  },
}

export const getters = {
  skills(state) {
    return state.skills.map((skill) => ({
      text: skill.name,
      value: skill.id,
    }))
  },
  focusInterests(state) {
    return state.focusInterests.map((focusInterest) => ({
      text: focusInterest.name,
      value: focusInterest.id,
    }))
  },
  currentRoles(state) {
    return state.currentRoles.map((role) => ({
      text: role.name,
      value: role.id,
    }))
  },
  associations(state) {
    return state.associations.map((association) => ({
      text: association.name,
      value: association.id,
    }))
  },
  reasonsProfiles(state) {
    return state.reasonsProfiles.map((reason) => ({
      text: reason.name,
      value: reason.id,
    }))
  },
}
