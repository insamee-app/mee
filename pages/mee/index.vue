<template>
  <AppContainer class="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-8">
    <div class="lg:row-span-2">
      <div
        class="
          space-y-4
          flex flex-row
          items-center
          lg:flex-col
          lg:items-start
          lg:sticky
          lg:top-4
        "
      >
        <!-- TODO: Il faut faire un labeled select -->
        <InsameeAppCard class="w-full">
          <div class="flex flex-row justify-between">
            <div class="flex">
              <span>item par page</span>
              <AppSelect
                v-model="itemPerPage"
                :items="itemsPerPage"
                name="itemsPerPage"
              />
            </div>
            <client-only>
              <InsameeAppButton v-if="mdAndDown" @click="filterDialog = true">
                Filtrer
              </InsameeAppButton>
            </client-only>
          </div>
        </InsameeAppCard>
        <client-only>
          <InsameeAppCard v-if="lgAndUp" class="w-full">
            <template #header>Filtres</template>
            <!-- TODO: il ne remet pas à la page 1 -->
            <FiltersUsers />
            <template #actions>
              <div class="flex flex-row justify-end">
                <InsameeAppButton @click="validDialog"
                  >Valider</InsameeAppButton
                >
              </div>
            </template>
          </InsameeAppCard>
        </client-only>
      </div>
    </div>
    <div v-if="$fetchState.pending">loading...</div>
    <div v-else-if="$fetchState.error">
      <pre>{{ $fetchState.error }}</pre>
    </div>
    <div v-else class="col-span-2">
      <!-- TODO: faire un skeleton avec l'animation tailwind -->
      <section class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UserCard
          v-for="profile in data.data"
          :key="profile.user_id"
          :profile="profile"
        />
      </section>
      <PaginateData
        :meta="data.meta"
        class="max-w-lg mx-auto mt-6"
        @change="fetch"
      />
    </div>
    <client-only>
      <div>
        <InsameeAppModal
          v-if="mdAndDown"
          :value="filterDialog"
          @outside="filterDialog = false"
        >
          <InsameeAppCard closable @close="filterDialog = false">
            <template #header>Filtres</template>
            <FiltersUsers />
            <template #actions>
              <div class="flex flex-row justify-end">
                <InsameeAppButton @click="validDialog"
                  >Valider</InsameeAppButton
                >
              </div>
            </template>
          </InsameeAppCard>
        </InsameeAppModal>
      </div>
    </client-only>
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
    const path = '/api/v1/profiles'
    const params = this.$store.getters['filters/getUsersSearchParams']
    const response = await this.$axios.get(`${path}?${params}`, {
      withCredentials: true,
    })

    this.data = response.data
  },
  computed: {
    // Exporter les fonctions dans une mixins et faire la propostion dans l'issue
    mdAndDown() {
      return (
        (this.$screen.xs || this.$screen.sm || this.$screen.md) &&
        !this.$screen.lg
      )
    },
    lgAndUp() {
      return this.$screen.lg
    },
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
