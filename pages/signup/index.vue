<template>
  <section class="w-80 mx-auto">
    <form action="#" @submit.prevent="signin">
      <InsameeLabeledInput
        v-model="$v.email.$model"
        :error-message="mailMessage"
        border
        type="email"
        name="email"
        placeholder="exemple@insamee.fr"
        class="w-full"
        label="Adresse électronique"
      />
      <InsameeLabeledInput
        v-model="$v.password.$model"
        :error-message="passwordMessage"
        border
        type="password"
        name="password"
        placeholder="*******"
        class="w-full mt-2"
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
        label="Vérification du mot de passe"
      />
      <InsameeLabeledCheck
        :value="receiveEmail"
        class="mt-2"
        name="receiveEmail"
        label="J'accepte de recevoir des mails pour prolonger l'expérience TEAM"
        title="TEAM ne vous enverra pas d'emails promotionnels ni de spams"
        @change="receiveEmail = $event"
      />
      <InsameeAppButton
        large
        class="w-full mt-8"
        :disabled="$v.$invalid"
        :loading="loading"
        type="submit"
        >S'inscrire</InsameeAppButton
      >
      <div class="text-sm text-center text-grey-base">
        En cliquant sur S’inscrire, vous acceptez nos
        <InsameeAppButton empty inline :to="{ name: 'terms-of-use' }">
          Conditions Générales d'Utilisation.</InsameeAppButton
        >
      </div>
      <InsameeAppError :error-message="error" />
    </form>
    <InsameeAppFrame class="w-full mt-8" variant="secondary">
      <span>
        Déjà un comptes ?
        <InsameeAppButton
          empty
          inline
          :to="{ name: 'login' }"
          variant="secondary"
        >
          Se connecter
        </InsameeAppButton></span
      >
    </InsameeAppFrame>
  </section>
</template>

<script>
import mailMessages from '~/mixins/validationsMail'
import passwordMessages from '~/mixins/validationPassword'

export default {
  mixins: [mailMessages, passwordMessages],
  layout: 'minimal',
  data() {
    return {
      error: '',
      loading: false,
      email: '',
      password: '',
      password_confirmation: '',
      receiveEmail: false,
    }
  },
  methods: {
    async signin() {
      this.loading = true
      try {
        await this.$axios.post('/auth/register', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          receiveEmail: this.receiveEmail,
        })
        this.error = ''
        this.$router.push({ name: 'signup-thanks' })
      } catch (error) {
        if (error.response.status === 422) {
          this.error = error.response.data.errors[0].message
        } else {
          this.error = 'Une erreur est survenue'
        }
      }
      this.loading = false
    },
  },
}
</script>
