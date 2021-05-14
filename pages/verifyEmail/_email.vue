<template>
  <section>
    <h1 class="text-2xl mb-8">Votre compte a été vérifié avec succès</h1>
    <AppButton large :to="{ name: 'me' }">Accéder à la plateforme</AppButton>
  </section>
</template>

<script>
export default {
  layout: 'minimal',
  async asyncData({ store, route, error, $axios }) {
    const { email } = route.params
    const { signature } = route.query

    try {
      const response = await $axios.post(
        `/auth/verify/${email}?signature=${signature}`,
        undefined,
        { withCredentials: true }
      )
      store.commit('auth/setUser', response.data)
    } catch (e) {
      const { status, message } = e.response.data
      error({ status, message })
    }
  },
}
</script>
