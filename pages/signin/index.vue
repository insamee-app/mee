<template>
  <section>
    <form action="#" @submit.prevent="signin">
      <AppInput
        v-model="$v.email.$model"
        :error-message="mailMessage"
        type="email"
        name="email"
        placeholder="exemple@insamee.fr"
        class="w-full"
      >
        <template #label> Adresse électronique </template>
      </AppInput>
      <AppInput
        v-model="$v.password.$model"
        :error-message="passwordMessage"
        type="password"
        name="password"
        placeholder="*******"
        class="w-full mt-2"
      >
        <template #label> Mot de passe </template>
      </AppInput>
      <AppInput
        v-model="$v.password_confirmation.$model"
        :error-message="passwordConfirmationMessage"
        type="password"
        name="password_confirmation"
        placeholder="*******"
        class="w-full mt-2"
      >
        <template #label> Vérification du mot de passe </template>
      </AppInput>
      <AppButton
        large
        class="w-full mt-8"
        :disabled="$v.$invalid"
        :loading="loading"
        type="submit"
        >S'inscrire</AppButton
      >
      <AppError :errors="errors" />
    </form>
    <AppFrame class="w-full mt-8">
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
        this.$router.push({ name: 'signin-thanks' })
      } catch (error) {
        this.errors = error.response.data.errors
      }
      this.loading = false
    },
  },
}
</script>
