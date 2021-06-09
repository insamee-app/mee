<template>
  <AppContainer>
    <div class="flex flex-row justify-between items-center">
      <AppSelect
        v-model="itemPerPage"
        :items="itemsPerPage"
        name="itemsPerPage"
      />
      <InsameeAppButton @click="filterDialog = true">
        Filtrer
      </InsameeAppButton>
    </div>
    <div v-if="$fetchState.pending">loading...</div>
    <div v-else-if="$fetchState.error">
      <pre>{{ $fetchState.error }}</pre>
    </div>
    <div v-else>
      <PaginateData :meta="data.meta" @change="fetch" />
      <!-- TODO: faire un skeleton avec l'animation tailwind -->
      <section class="grid grid-cols-1 gap-4">
        <UserCard v-for="user in data.data" :key="user.id" :user="user" />
      </section>
    </div>
    <InsameeAppModal :value="filterDialog" @outside="filterDialog = false">
      <InsameeAppCard closable @close="filterDialog = false">
        <template #header>Filtres</template>
        <FiltersUsers />
        <template #actions>
          <div class="flex flex-row justify-end">
            <InsameeAppButton @click="validDialog">Valider</InsameeAppButton>
          </div>
        </template>
      </InsameeAppCard>
    </InsameeAppModal>
  </AppContainer>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      data: {},
      filterDialog: false,
      itemsPerPage: [
        { name: '5', id: 5 },
        { name: '10', id: 10 },
        { name: '20', id: 20 },
      ],
    }
  },
  async fetch() {
    const path = '/api/v1/users'
    const params = this.$store.getters['filters/getUsersSearchParams']
    const response = await this.$axios.get(`${path}?${params}`, {
      withCredentials: true,
    })

    this.data = response.data
  },
  computed: {
    itemPerPage: {
      get() {
        return this.$store.state.filters.users.limit
      },
      set(value) {
        this.$store.commit('filters/setUsersFilter', { name: 'page', value: 1 })
        this.$store.commit('filters/setUsersFilter', {
          name: 'limit',
          value,
        })
        this.fetch()
      },
    },
  },
  watch: {
    '$route.query'() {
      this.parseUrl()
      this.$fetch()
    },
  },
  beforeMount() {
    this.parseUrl()
  },
  fetchOnServer: false,
  methods: {
    validDialog() {
      const query = this.$store.getters['filters/getUsersSearchParams']
      this.$router.push({
        path: `/mee?${query}`,
      })
      this.filterDialog = false
    },
    parseUrl() {
      for (const query in this.$route.query) {
        this.$store.commit('filters/setUsersFilter', {
          name: query,
          value: this.$route.query[query],
        })
      }
    },
    fetch() {
      this.$fetch()
      const query = this.$store.getters['filters/getUsersSearchParams']
      this.$router.push({
        path: `/mee?${query}`,
      })
    },
  },
}
</script>
