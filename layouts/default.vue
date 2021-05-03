<template>
  <div>
    <TheHeader @open="toggleNav" />
    <TheNavMobile v-if="nav" @close="toggleNav" />
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
  methods: {
    toggleNav(state) {
      this.nav = state
    },
  },
}
</script>
