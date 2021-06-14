<template>
  <section>
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
        type="password"
        name="password"
        placeholder="*******"
        class="w-full"
        label="Mot de passe"
      />
      <InsameeLabeledInput
        v-model="$v.password_confirmation.$model"
        :error-message="passwordConfirmationMessage"
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
        >Modifier son mot de passe</InsameeAppButton
      >
      <InsameeAppListError :errors="errors" />
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
