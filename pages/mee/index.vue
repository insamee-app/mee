<template>
  <InsameeResponsiveList>
    <template #filter>
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
          <InsameeAppButton
            v-if="mdAndDown"
            variant="secondary"
            @click="filterDialog = true"
          >
            Filtrer
          </InsameeAppButton>
        </div>
      </InsameeAppCard>
      <InsameeAppCard v-if="lgAndUp" class="w-full">
        <InsameeAppCardTitle>Filtres</InsameeAppCardTitle>
        <FiltersUsers />
        <template #actions>
          <div class="flex flex-row justify-end">
            <InsameeAppButton @click="validDialog">Valider</InsameeAppButton>
          </div>
        </template>
      </InsameeAppCard>
    </template>
    <template #cards>
      <InsameeResponsiveListCards>
        <InsameeProfileCard
          v-for="profile in data"
          :key="profile.id"
          :user-id="profile.user_id"
          :last-name="profile.last_name"
          :first-name="profile.first_name"
          :current-role="profile.current_role"
          :skills="getTexts(profile.insameeProfile.skills)"
          :associations="profile.insameeProfile.associations"
          :text="profile.insameeProfile.text"
          :link="profile.avatarUrl"
        />
        <template #pagination>
          <InsameeResponsiveListPagination>
            <InsameePagination
              v-if="meta"
              :small="!$screen.md"
              :previous-page="getPage(meta.previous_page_url)"
              :next-page="getPage(meta.next_page_url)"
              :first-page="meta.first_page"
              :current-page="meta.current_page"
              :last-page="meta.last_page"
              @pagination="fetch"
            />
          </InsameeResponsiveListPagination>
        </template>
      </InsameeResponsiveListCards>
    </template>
    <template #modal>
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
              <InsameeAppButton @click="validDialog">Valider</InsameeAppButton>
            </div>
          </template>
        </InsameeAppCard>
      </InsameeAppModal>
    </template>
  </InsameeResponsiveList>
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
    const response = await this.$axios.get(
      `${path}?${params}&populate=insamee`,
      {
        withCredentials: true,
      }
    )
    this.data = response.data.data
    this.meta = response.data.meta
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
    getPage(value) {
      if (!value) return
      const getNumber = /(?<number>\d+)/i
      const { groups } = getNumber.exec(value)
      return Number(groups.number)
    },
    getTexts(tab) {
      if (!tab || tab.length === 0) return []

      const data = []
      for (const item of tab) {
        data.push(item.name)
      }
      return data
    },
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
    fetch(value) {
      this.$store.commit('filters/setUsersFilter', { name: 'page', value })
      this.$fetch()
      const query = this.$store.getters['filters/getUsersSearchParams']
      this.$router.push({
        path: `/mee?${query}`,
      })
    },
  },
}
</script>
