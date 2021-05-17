<template>
  <section>
    <form action="#" @submit.prevent="login">
      <AppInput
        v-model="$v.email.$model"
        :error-message="mailMessage"
        type="email"
        name="email"
        placeholder="exemple@insamee.fr"
        class="w-full mb-2"
      >
        <template #label> Adresse électronique </template>
      </AppInput>
      <AppInput
        v-model="$v.password.$model"
        :error-message="passwordMessage"
        type="password"
        name="password"
        placeholder="*******"
        class="w-full mb-8"
      >
        <template #label> Mot de passe </template>
        <template #addon
          ><NuxtLink :to="{ name: 'sendResetPassword' }"> Oublié ?</NuxtLink>
        </template>
      </AppInput>
      <AppButton large class="w-full" type="submit" :disabled="$v.$invalid"
        >Se connecter</AppButton
      >
      <AppError :errors="errors" />
    </form>
    <AppFrame class="w-full mt-8">
      <span
        >Pas encore de compte ?
        <NuxtLink class="text-primary-base" :to="{ name: 'signin' }"
          >S'inscire</NuxtLink
        ></span
      >
    </AppFrame>
    <div class="text-center leading-5 mt-8">
      <div class="font-light">Besoin de vérifier votre compte ?</div>
      <AppNuxtLink :to="{ name: 'sendVerifyEmail' }"
        >Renvoyer le couriel</AppNuxtLink
      >
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import mailMessages from '@/validations/mail'

export default {
  mixins: [mailMessages],
  layout: 'minimal',
  data() {
    return {
      errors: [],
      email: '',
      password: '',
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
      try {
        const { data: user } = await this.$axios.post(
          '/auth/login',
          {
            email: this.email,
            password: this.password,
            rememberMe: false,
          },
          { withCredentials: true }
        )
        this.errors = []
        this['auth/login'](user)
        this.$router.push({ name: 'mee' })
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>
