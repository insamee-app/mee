<template>
  <section>
    <div v-if="ok">
      <h1 class="text-center text-2xl">Votre mot de passe a bien été changé</h1>
      <AppButton :to="{ name: 'login' }" large class="mt-8 w-full"
        >Se connecter</AppButton
      >
    </div>
    <form v-else action="#" @submit.prevent="sendResetPassword">
      <AppInput
        v-model="$v.password.$model"
        :error-message="passwordMessage"
        type="password"
        name="password"
        placeholder="*******"
        class="w-full mb-2"
      >
        <template #label> Mot de passe </template>
      </AppInput>
      <AppInput
        v-model="$v.password_confirmation.$model"
        :error-message="passwordConfirmationMessage"
        type="password"
        name="password_confirmation"
        placeholder="*******"
        class="w-full mb-8"
      >
        <template #label> Confirmer le mot de passe </template>
      </AppInput>
      <AppButton
        large
        class="w-full"
        :disabled="$v.$invalid"
        :loading="loading"
        type="submit"
        >Modifier son mot de passe</AppButton
      >
      <AppError :errors="errors" />
    </form>
  </section>
</template>

<script>
import passwordMessages from '@/validations/password'

export default {
  mixins: [passwordMessages],
  layout: 'minimal',
  data() {
    return {
      errors: [],
      loading: false,
      password: '',
      password_confirmation: '',
      ok: false,
    }
  },
  methods: {
    async sendResetPassword() {
      const { email } = this.$route.params
      const { signature } = this.$route.query

      this.loading = true
      try {
        await this.$axios.post(
          `/auth/resetPassword/${email}?signature=${signature}`,
          {
            password: this.password,
            password_confirmation: this.password_confirmation,
          }
        )
        this.errors = []
        this.ok = true
      } catch (error) {
        this.errors = error.response.data.errors
      }
      this.loading = false
    },
  },
}
</script>
