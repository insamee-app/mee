<template>
  <section>
    <form action="#" @submit.prevent="login">
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
      >
        <template #addon>
          <NuxtLink :to="{ name: 'sendResetPassword' }"> Oublié ?</NuxtLink>
        </template>
      </InsameeLabeledInput>
      <InsameeLabeledCheck
        :value="rememberMe"
        class="mt-2"
        name="rememberMe"
        label="Se souvenir de moi"
        @change="rememberMe = $event"
      />
      <InsameeAppButton
        large
        class="w-full mt-8"
        type="submit"
        :disabled="$v.$invalid"
        :loading="loading"
      >
        Se connecter
      </InsameeAppButton>
      <InsameeAppListError :errors="errors" />
    </form>
    <InsameeAppFrame class="w-full mt-8">
      <span>
        Pas encore de compte ?
        <InsameeAppButton :to="{ name: 'signin' }" empty inline>
          S'inscire
        </InsameeAppButton>
      </span>
    </InsameeAppFrame>
    <div class="text-center leading-5 mt-8">
      <div class="font-light">Besoin de vérifier votre compte ?</div>
      <InsameeAppButton :link="{ name: 'sendVerifyEmail' }" empty inline>
        Renvoyer le couriel
      </InsameeAppButton>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import mailMessages from '~/mixins/validationsMail'

export default {
  mixins: [mailMessages],
  layout: 'minimal',
  data() {
    return {
      errors: [],
      email: '',
      password: '',
      rememberMe: false,
      loading: false,
    }
  },
  validations: {
    password: {
      required,
    },
  },
  computed: {
    passwordMessage() {
      if (!this.$v.password.$dirty) return ''

      if (!this.$v.password.required) return 'Un mot de passe est requis'

      return ''
    },
  },
  methods: {
    ...mapActions(['auth/login']),
    async login() {
      this.loading = true
      try {
        await this.$axios.post(
          '/auth/login',
          {
            email: this.email,
            password: this.password,
            rememberMe: this.rememberMe,
          },
          { withCredentials: true }
        )
        const { data: profile } = await this.$axios.get('/api/v1/profiles/me', {
          withCredentials: true,
        })
        this.errors = []
        this.loading = false
        this['auth/login'](profile)
        this.$router.push({ name: 'mee' })
      } catch (error) {
        if (error.response) {
          this.errors = error.response.data.errors
        } else {
          this.errors = [
            {
              message: 'Erreur réseau',
            },
          ]
        }
        this.loading = false
      }
    },
  },
}
</script>
