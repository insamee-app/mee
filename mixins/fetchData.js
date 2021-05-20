import { pascalCase, camelCase } from 'change-case'

export default {
  data() {
    return {
      fetchedData: [],
    }
  },
  async fetch() {
    if (!this.ressource)
      throw new Error('Provide a dataName to the fetchData mixin')

    const storeData = this.$store.state.data[camelCase(this.ressource)]
    // Get data from the store but if empty from the api
    if (storeData) {
      this.fetchedData = storeData
    } else {
      const { data } = await this.$axios.get(`/api/v1/${this.ressource}`, {
        withCredentials: true,
      })
      this.fetchedData = data
      this.$store.commit(`data/set${pascalCase(this.ressource)}`, data)
    }
  },
}
