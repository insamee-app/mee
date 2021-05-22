<template>
  <section>
    <h1 class="text-2xl mb-8">Votre compte a été vérifié avec succès</h1>
    <AppButton large :to="{ name: 'me' }">Accéder à la plateforme</AppButton>
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
      `/auth/verify/${email}?signature=${signature}`,
      undefined,
      { withCredentials: true }
    )
    this.$store.commit('auth/setUser', response.data)
  },
}
</script>
