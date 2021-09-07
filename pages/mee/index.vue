<template>
  <InsameeResponsiveList
    :full-filters="lgAndUp"
    :action-filters="mdAndDown"
    :total-pagination="paginationTotal"
    :loading="$fetchState.pending"
  >
    <template #filters-full="{ classNames }">
      <FiltersCard :class="classNames" @submit="refreshFilters" />
    </template>
    <template #cards="{ loading }">
      <InsameeResponsiveListCards :loading="loading">
        <template #skeletons>
          <InsameeSkeletonCard
            v-for="value in 20"
            :key="value"
            variant="profile"
          />
        </template>
        <template #cards>
          <InsameeProfileCard
            v-for="profile in profiles"
            :key="profile.user_id"
            :user-id="profile.user_id"
            :last-name="profile.last_name"
            :first-name="profile.first_name"
            :current-role="profile.current_role"
            :skills="getTexts(profile.insamee_profile.skills)"
            :associations="profile.insamee_profile.associations"
            :text="profile.insamee_profile.short_text"
            :link="profile.url_picture"
          />
        </template>
      </InsameeResponsiveListCards>
    </template>
    <template #error>
      <div class="space-y-2 mt-4">
        <p class="font-bold">
          Désolé, aucun mee ne correspond à ta recherche... Tu peux essayer une
          nouvelle recherche.
        </p>
        <p>
          Mais si tu penses que c’est une erreur de notre part, tu peux nous
          contacter pour palier à ce problème.
        </p>
      </div>
      <div class="mt-8">
        <InsameeAppButton empty :to="{ name: 'contact' }">
          Nous contacter ?
        </InsameeAppButton>
      </div>
    </template>
    <template #filters-action>
      <InsameeAppButton
        shadow
        variant="secondary"
        class="mt-6"
        @click="modalFilters = true"
      >
        {{ filterMessage }}
      </InsameeAppButton>
      <Portal v-if="modalFilters">
        <InsameeAppModal :value="modalFilters" @outside="modalFilters = $event">
          <FiltersCard
            closable
            @submit="refreshFilters"
            @close="modalFilters = !$event"
          />
        </InsameeAppModal>
      </Portal>
    </template>
    <template #pagination="{ classNames }">
      <InsameeResponsiveListPagination :class="classNames">
        <InsameePagination
          :small="mdAndDown"
          :previous-page="
            pagination.previous_page_url
              ? pagination.current_page - 1
              : undefined
          "
          :next-page="
            pagination.next_page_url ? pagination.current_page + 1 : undefined
          "
          :first-page="pagination.first_page"
          :current-page="pagination.current_page"
          :last-page="pagination.last_page"
          @pagination="refreshPagination"
        />
      </InsameeResponsiveListPagination>
    </template>
  </InsameeResponsiveList>
</template>

<script>
import getTexts from '@/mixins/getTexts'
import { Portal } from '@linusborg/vue-simple-portal'

export default {
  components: { Portal },
  mixins: [getTexts],
  middleware: 'authenticated',
  data() {
    return {
      modalFilters: false,
      profiles: [],
      pagination: undefined,
    }
  },
  async fetch() {
    const query = this.$store.getters['filters/getProfilesSearchParams']
    const path = `/api/v1/profiles?${query}&serialize=card&populate=insamee&platform=insamee`

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
    paginationTotal() {
      return this.pagination ? this.pagination.total : 0
    },
    filterMessage() {
      return this.paginationTotal
        ? 'Rechercher par filtres'
        : "Essayer d'autres filtres"
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
  methods: {
    parseUrl() {
      this.$store.commit('filters/resetFilters')
      for (const query in this.$route.query) {
        const value = this.$route.query[query]
        this.$store.commit('filters/setPagination', {
          pagination: 'profiles',
          name: query,
          value,
        })

        this.$store.commit('filters/setFilters', {
          filter: 'profiles',
          name: query,
          // With one number, *[] value is a single value and not an array, so we need to convert it
          value:
            query.includes('[]') && !Array.isArray(value) ? [value] : value,
        })
      }
    },
    refreshPagination(value) {
      this.$store.commit('filters/setPagination', {
        pagination: 'profiles',
        name: 'page',
        value,
      })
      this.setRoute()
    },
    refreshFilters(data) {
      this.modalFilters = false
      for (const iterator in data) {
        const value = data[iterator]
        this.$store.commit('filters/setFilters', {
          filter: 'profiles',
          name: iterator,
          value,
        })
      }
      this.setRoute()
    },
    setRoute() {
      const query = this.$store.getters['filters/getProfilesSearchParams']
      this.$router.push({
        path: `/mee?${query}`,
      })
    },
  },
}
</script>
