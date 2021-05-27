export const state = () => ({
  skills: undefined,
  focusInterests: undefined,
  associations: undefined,
  currentRoles: [
    { id: 'étudiant', name: 'étudiant' },
    { id: 'personnel', name: 'personnel' },
  ],
})

export const mutations = {
  setSkills(state, skills) {
    state.skills = skills
  },
  setFocusInterests(state, focusInterests) {
    state.focusInterests = focusInterests
  },
  setAssociations(state, associations) {
    state.associations = associations
  },
}
