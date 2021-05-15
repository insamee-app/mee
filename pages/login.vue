<template>
  <section>
    <AppInput
      v-model="email"
      type="email"
      name="email"
      placeholder="exemple@insamee.fr"
      class="w-full mb-2"
    >
      <template #label> Adresse électronique </template>
    </AppInput>
    <AppInput
      v-model="password"
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
    <AppButton large class="w-full mb-8" @click="login" @keypress.enter="login"
      >Se connecter</AppButton
    >
    <AppFrame class="w-full mb-8">
      <span
        >Pas encore de compte ?
        <NuxtLink class="text-primary-base" :to="{ name: 'signin' }"
          >S'inscire</NuxtLink
        ></span
      >
    </AppFrame>
    <div class="text-center leading-5">
      <div class="font-light">Besoin de vérifier votre compte ?</div>
      <AppNuxtLink :to="{ name: 'sendVerifyEmail' }"
        >Renvoyer le couriel</AppNuxtLink
      >
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  layout: 'minimal',
  data() {
    return {
      email: '',
      password: '',
    }
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
        this['auth/login'](user)
        this.$router.push({ name: 'mee' })
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
