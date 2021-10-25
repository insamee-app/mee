<template>
  <section class="w-80 mx-auto">
    <div v-if="ok">
      <h1 class="text-center text-2xl">Votre mot de passe a bien été changé</h1>
      <InsameeAppButton :to="{ name: 'login' }" large class="mt-8 w-full">
        Se connecter
      </InsameeAppButton>
    </div>
    <form v-else action="#" @submit.prevent="sendResetPassword">
      <InsameeLabeledInput
        v-model="$v.password.$model"
        :error-message="passwordMessage"
        border
        type="password"
        name="password"
        placeholder="*******"
        class="w-full"
        label="Mot de passe"
      />
      <InsameeLabeledInput
        v-model="$v.password_confirmation.$model"
        :error-message="passwordConfirmationMessage"
        border
        type="password"
        name="password_confirmation"
        placeholder="*******"
        class="w-full mt-2"
        label="Confirmer le mot de passe"
      />
      <InsameeAppButton
        large
        class="w-full mt-8"
        :disabled="$v.$invalid"
        :loading="loading"
        type="submit"
      >
        Modifier son mot de passe
      </InsameeAppButton>
      <InsameeAppError :error-message="error" />
    </form>
  </section>
</template>

<script>
import passwordMessages from '~/mixins/validationPassword'

export default {
  mixins: [passwordMessages],
  layout: 'minimal',
  data() {
    return {
      error: '',
      loading: false,
      password: '',
      password_confirmation: '',
      ok: false,
    }
  },
  head() {
    return {
      title: 'Réinitialiser son mot de passe',
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
        this.error = ''
        this.ok = true
      } catch (error) {
        if (error.response.data.errors)
          this.error = error.response.data.errors[0].message
        else this.error = "Une erreur s'est produite"
      }
      this.loading = false
    },
  },
}
</script>
