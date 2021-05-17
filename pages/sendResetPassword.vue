<template>
  <section>
    <AppInput
      v-model="$v.email.$model"
      :error-message="mailMessage"
      type="email"
      name="email"
      placeholder="exemple@insamee.fr"
      class="w-full mb-8"
    >
      <template #label> Adresse électronique </template>
    </AppInput>
    <AppButton large class="w-full" :disabled="$v.$invalid" @click="sendMail"
      >Envoyer le couriel de réinitialisation</AppButton
    >
    <AppError :errors="errors" />
  </section>
</template>

<script>
import mailMessages from '@/validations/mail'

export default {
  mixins: [mailMessages],
  layout: 'minimal',
  data() {
    return {
      errors: [],
      email: '',
    }
  },
  methods: {
    async sendMail() {
      try {
        const response = await this.$axios.post('/auth/send/resetPassword', {
          email: this.email,
        })
        this.errors = undefined
        console.log(response)
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>
