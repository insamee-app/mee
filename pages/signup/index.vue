<template>
  <section>
    <form action="#" @submit.prevent="signin">
      <InsameeLabeledInput
        v-model="$v.email.$model"
        :error-message="mailMessage"
        type="email"
        name="email"
        placeholder="exemple@insamee.fr"
        class="w-full"
        label="Adresse électronique"
      />
      <InsameeLabeledInput
        v-model="$v.password.$model"
        :error-message="passwordMessage"
        type="password"
        name="password"
        placeholder="*******"
        class="w-full mt-2"
        label="Mot de passe"
      />
      <InsameeLabeledInput
        v-model="$v.password_confirmation.$model"
        :error-message="passwordConfirmationMessage"
        type="password"
        name="password_confirmation"
        placeholder="*******"
        class="w-full mt-2"
        label="Vérification du mot de passe"
      />
      <InsameeAppButton
        large
        class="w-full mt-8"
        :disabled="$v.$invalid"
        :loading="loading"
        type="submit"
        >S'inscrire</InsameeAppButton
      >
      <InsameeAppListError :errors="errors" />
    </form>
    <InsameeAppFrame class="w-full mt-8">
      <span
        >Déjà un comptes ?
        <InsameeAppLink :link="{ name: 'login' }"
          >Se connecter</InsameeAppLink
        ></span
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
      errors: [],
      loading: false,
      email: '',
      password: '',
      password_confirmation: '',
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
        })
        this.errors = []
        this.$router.push({ name: 'signup-thanks' })
      } catch (error) {
        // TODO: il faut gérer si on a pas de response (voir si on peut pas faire un intercepteur avec axios
        this.errors = error.response.data.errors
      }
      this.loading = false
    },
  },
}
</script>
