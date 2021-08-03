export const state = () => ({
  pagination: {
    profiles: {
      page: 1,
    },
  },
  filters: {
    profiles: {
      // text: '',
      currentRole: {},
      'skills[]': [],
      'focusInterests[]': [],
      'associations[]': [],
    },
  },
})

export const mutations = {
  setPagination(state, { pagination, name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.pagination[pagination]).includes(name))
      state.pagination[pagination][name] = value
  },
  setFilters(state, { filter, name, value }) {
    // Avoid unwanted value from url
    if (Object.keys(state.filters[filter]).includes(name)) {
      if (Array.isArray(value))
        state.filters[filter][name] = value.map((v) => +v)
      else state.filters[filter][name] = value
    }
  },
  resetFilters(state) {
    state.filters.profiles = {
      // text: '',
      currentRole: {},
      'skills[]': [],
      'focusInterests[]': [],
      'associations[]': [],
    }
  },
}

export const getters = {
  getProfilesSearchParams({
    pagination: { profiles: profilesPagination },
    filters: { profiles: profilesFilters },
  }) {
    const searchParams = new URLSearchParams()
    for (const property in profilesPagination) {
      const value = profilesPagination[property]
      if (value) searchParams.append(property, value)
    }
    for (const property in profilesFilters) {
      const value = profilesFilters[property]
      if (Array.isArray(value) && value.length > 0)
        value.forEach((v) => searchParams.append(property, v))
      else if (typeof value === 'string' && value)
        searchParams.append(property, value)
    }
    return searchParams.toString()
  },
  // text({ filters: { profiles } }) {
  //   return profiles.text
  // },
  currentRole({ filters: { profiles } }) {
    return profiles.currentRole
  },
  skills({ filters: { profiles } }) {
    return profiles['skills[]']
  },
  focusInterests({ filters: { profiles } }) {
    return profiles['focusInterests[]']
  },
  associations({ filters: { profiles } }) {
    return profiles['associations[]']
  },
}
