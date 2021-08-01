<template>
  <div :class="{ 'xl:overflow-hidden': isIndex }">
    <client-only>
      <TheHeader :nav="navList" @open="toggleNav" />
      <TheNavMobile
        v-if="!$screen.md"
        :value="nav"
        :nav="navList"
        @close="toggleNav"
      />
    </client-only>
    <main class="max-w-7xl mx-auto">
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      nav: false,
    }
  },
  computed: {
    navList() {
      const nav = [
        {
          name: 'Le concept',
          to: { name: 'concept' },
        },
        {
          name: 'Contact',
          to: { name: 'contact' },
        },
      ]
      nav.unshift(
        this.loggedIn()
          ? {
              name: 'Mon profil',
              to: { name: 'me' },
            }
          : { name: 'Acceuil', to: { name: 'index' } }
      )

      return nav
    },
    isIndex() {
      return this.$route.name === 'index'
    },
  },
  watch: {
    $route() {
      this.nav = false
    },
  },
  methods: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
    toggleNav(state) {
      this.nav = state
    },
  },
}
</script>
