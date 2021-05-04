<template>
  <div>
    <TheHeader @open="toggleNav" />
    <TheNavMobile v-model="nav" />
    <main>
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: false,
    }
  },
  watch: {
    $route(a) {
      this.nav = false
    },
  },
  methods: {
    toggleNav(state) {
      this.nav = state
    },
  },
}
</script>
