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
  </section>
</template>

<script>
import mailMessages from '@/validations/mail'

export default {
  mixins: [mailMessages],
  layout: 'minimal',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async sendMail() {
      try {
        const response = await this.$axios.post('/auth/send/resetPassword', {
          email: this.email,
        })
        console.log(response)
      } catch (error) {
        console.error(error.response.data)
      }
    },
  },
}
</script>
