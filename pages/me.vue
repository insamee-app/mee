<template>
  <AppContainer>
    <UserProfil :user="user" />
    <section v-if="socials.length" class="mb-4">
      <h2 class="text-2xl font-bold mb-2">Moyen pour me contacter</h2>
      <AppContact :links="socials" />
    </section>
    <div class="flex flex-row justify-end sticky bottom-4 mb-4">
      <AppButton large>Editer le profil</AppButton>
    </div>
    <div class="mb-4">
      <h2 class="text-2xl font-bold mb-4">Zone de danger</h2>
      <div class="flex flex-col items-center">
        <AppButton large class="mb-4">Modifier son mot de passe</AppButton>
        <AppButton large border>Supprimer son compte</AppButton>
      </div>
    </div>
  </AppContainer>
</template>

<script>
export default {
  middleware: ['authenticated'],
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    socials() {
      const data = {
        ...this.user.social_networks,
      }
      if (this.user.mobile) data.tel = this.user.mobile

      return data
    },
  },
}
</script>
