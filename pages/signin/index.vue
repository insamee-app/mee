<template>
  <section>
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
      <template #label> Vérification du mot de passe </template>
    </AppInput>
    <AppButton
      large
      class="w-full mb-8"
      :disabled="$v.$invalid"
      @click="signin"
      @keypress.enter="signin"
      >S'inscrire</AppButton
    >
    <AppFrame class="w-full mb-8">
      <span
        >Déjà un comptes ?
        <NuxtLink class="text-primary-base" :to="{ name: 'login' }"
          >Se connecter</NuxtLink
        ></span
      >
    </AppFrame>
  </section>
</template>

<script>
import mailMessages from '@/validations/mail'
import passwordMessages from '@/validations/password'

export default {
  mixins: [mailMessages, passwordMessages],
  layout: 'minimal',
  data() {
    return {
      email: '',
      password: '',
      password_confirmation: '',
    }
  },
  methods: {
    async signin() {
      try {
        const response = await this.$axios.post('/auth/register', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        if (response.status === 200) {
          this.$router.push({ name: 'signin-thanks' })
        }
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
