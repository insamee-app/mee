export const state = () => ({
  users: {
    limit: '5',
    page: 1,
    currentRole: undefined,
    skill: undefined,
    focusInterest: undefined,
    association: undefined,
  },
})

export const mutations = {
  setUsersFilter(state, { name, value }) {
    state.users[name] = value
  },
}

export const getters = {
  getUsersSearchParams({ users }) {
    const data = {}
    for (const property in users) {
      if (users[property]) data[property] = users[property]
    }
    const searchParams = new URLSearchParams(data)
    return searchParams.toString()
  },
}
