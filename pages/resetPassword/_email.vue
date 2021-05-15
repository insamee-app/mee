<template>
  <section>
    <AppInput
      v-model="password"
      type="password"
      name="password"
      placeholder="*******"
      class="w-full mb-2"
    >
      <template #label> Mot de passe </template>
    </AppInput>
    <AppInput
      v-model="password_confirmation"
      type="password"
      name="password_confirmation"
      placeholder="*******"
      class="w-full mb-8"
    >
      <template #label> Confirmer le mot de passe </template>
    </AppInput>
    <AppButton large class="w-full" @click="sendResetPassword"
      >Modifier son mot de passe</AppButton
    >
  </section>
</template>

<script>
export default {
  layout: 'minimal',
  data() {
    return {
      password: '',
      password_confirmation: '',
    }
  },
  methods: {
    async sendResetPassword() {
      const { email } = this.$route.params
      const { signature } = this.$route.query

      try {
        const response = await this.$axios.post(
          `/auth/resetPassword/${email}?signature=${signature}`,
          {
            password: this.password,
            password_confirmation: this.password_confirmation,
          }
        )
        console.log(response)
      } catch (error) {
        console.error(error.response.data)
      }
    },
  },
}
</script>
