export const state = () => ({
  profiles: {
    limit: '5',
    page: 1,
    currentRole: undefined,
    skill: undefined,
    focusInterest: undefined,
    association: undefined,
  },
})

export const mutations = {
  setFilter(state, { name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.profiles).includes(name)) state.profiles[name] = value
  },
}

export const getters = {
  getSearchParams({ profiles }) {
    const data = {}
    for (const property in profiles) {
      if (profiles[property]) data[property] = profiles[property]
    }
    const searchParams = new URLSearchParams(data)
    return searchParams.toString()
  },
}
