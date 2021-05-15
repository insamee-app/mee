<template>
  <section>
    <AppInput
      v-model="email"
      type="email"
      name="email"
      placeholder="exemple@insamee.fr"
      class="w-full mb-8"
    >
      <template #label> Adresse électronique </template>
    </AppInput>
    <AppButton large class="w-full" @click="sendMail"
      >Envoyer le couriel de vérification</AppButton
    >
  </section>
</template>

<script>
export default {
  layout: 'minimal',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async sendMail() {
      try {
        const response = await this.$axios.post('/auth/send/verifyEmail', {
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
