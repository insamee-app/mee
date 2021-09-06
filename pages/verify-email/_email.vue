<template>
  <section class="w-80 mx-auto">
    <h1 class="text-2xl text-center">Votre compte a été vérifié avec succès</h1>
    <InsameeAppButton class="mt-8" large :to="{ name: 'me' }">
      Accéder à la plateforme
    </InsameeAppButton>
  </section>
</template>

<script>
export default {
  layout: 'minimal',
  fetchOnServer: false,
  async fetch() {
    const { email } = this.$route.params
    const { signature } = this.$route.query

    const response = await this.$axios.post(
      `/auth/verify/${email}?signature=${signature}`
    )
    this.$store.commit('auth/setUser', response.data)
  },
}
</script>
