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
        <FiltersProfiles />
        <template #actions>
          <div class="flex flex-row justify-end">
            <InsameeAppButton @click="validFilter">Valider</InsameeAppButton>
          </div>
        </template>
      </InsameeAppCard>
    </template>
    <template #cards>
      <InsameeResponsiveListCards>
        <template v-if="$fetchState.pending">
          <InsameeSkeletonCard
            v-for="value in +$store.state.filters.profiles.limit"
            :key="value"
          />
        </template>
        <template v-else>
          <InsameeProfileCard
            v-for="profile in profiles"
            :key="profile.id"
            :last-name="profile.last_name"
            :first-name="profile.first_name"
            :current-role="profile.current_role"
            :user-id="profile.user_id"
            :text="profile.insameeProfile.text"
            :skills="getTexts(profile.insameeProfile.skills)"
            :associations="profile.insameeProfile.associations"
            :link="profile.link"
          />
        </template>
        <template #pagination>
          <InsameeResponsiveListPagination>
            <InsameePagination
              v-if="!$fetchState.pending"
              :small="!$screen.lg"
              :previous-page="
                pagination.previous_page_url
                  ? pagination.current_page - 1
                  : undefined
              "
              :next-page="
                pagination.next_page_url
                  ? pagination.current_page + 1
                  : undefined
              "
              :first-page="pagination.first_page"
              :current-page="pagination.current_page"
              :last-page="pagination.last_page"
              @pagination="refresh"
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
          <FiltersProfiles />
          <template #actions>
            <div class="flex flex-row justify-end">
              <InsameeAppButton @click="validFilter">Valider</InsameeAppButton>
            </div>
          </template>
        </InsameeAppCard>
      </InsameeAppModal>
    </template>
  </InsameeResponsiveList>
</template>

<script>
import getTexts from '@/mixins/getTexts'

export default {
  mixins: [getTexts],
  middleware: 'authenticated',
  data() {
    return {
      profiles: [],
      meta: undefined,
      filterDialog: false,
      itemsPerPage: [
        { name: '5', id: 5 },
        { name: '10', id: 10 },
        { name: '20', id: 20 },
      ],
    }
  },
  async fetch() {
    const query = this.$store.getters['filters/getSearchParams']
    const path = '/api/v1/profiles?populate=insamee&' + query

    const { data } = await this.$axios.get(path)

    this.profiles = data.data
    this.pagination = data.meta
  },
  computed: {
    mdAndDown() {
      return !this.$screen.lg
    },
    lgAndUp() {
      return this.$screen.lg
    },
    itemPerPage: {
      get() {
        return this.$store.state.filters.profiles.limit
      },
      set(value) {
        this.$store.commit('filters/setFilter', { name: 'page', value: 1 })
        this.$store.commit('filters/setFilter', {
          name: 'limit',
          value,
        })
        this.setRoute()
      },
    },
  },
  watch: {
    '$route.query'() {
      this.parseUrl()
      this.$fetch()
      this.setRoute()
    },
  },
  beforeMount() {
    this.parseUrl()
  },
  fetchOnServer: false,
  methods: {
    validFilter() {
      this.setRoute()
      this.filterDialog = false
    },
    refresh(value) {
      this.$store.commit('filters/setFilter', {
        name: 'page',
        value,
      })
      this.setRoute()
    },
    parseUrl() {
      for (const query in this.$route.query) {
        const value = this.$route.query[query]
        this.$store.commit('filters/setFilter', {
          name: query,
          value,
        })
      }
    },
    setRoute() {
      const query = this.$store.getters['filters/getSearchParams']
      this.$router.push({
        path: `/mee?${query}`,
      })
    },
  },
}
</script>
