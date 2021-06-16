<template>
  <div>
    <client-only>
      <TheHeader :nav="navList" @open="toggleNav" />
      <TheNavMobile v-if="!$screen.sm" v-model="nav" :nav="navList" />
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
          name: 'Trouver des mee',
          path: 'mee',
        },
        {
          name: 'Contact',
          path: 'contact',
        },
      ]
      nav.unshift(
        this.loggedIn()
          ? { name: 'Mon profil', path: 'me' }
          : { name: 'Acceuil', path: 'index' }
      )
      return nav
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
