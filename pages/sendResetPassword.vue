<template>
  <section>
    <h1 v-if="ok" class="text-center text-2xl">
      Un mail vous a été envoyé afin de réinitialiser votre mot de passe
    </h1>
    <form v-else action="#" @submit.prevent="sendMail">
      <InsameeLabeledInput
        v-model="$v.email.$model"
        :error-message="mailMessage"
        type="email"
        name="email"
        placeholder="exemple@insamee.fr"
        class="w-full"
        label="Adresse électronique"
      />
      <InsameeAppButton
        class="w-full mt-8"
        :disabled="$v.$invalid"
        :loading="loading"
        type="submit"
        >Envoyer le couriel de réinitialisation</InsameeAppButton
      >
      <InsameeAppListError :errors="errors" />
    </form>
  </section>
</template>

<script>
import mailMessages from '~/mixins/validationsMail'

export default {
  mixins: [mailMessages],
  layout: 'minimal',
  data() {
    return {
      errors: [],
      loading: false,
      email: '',
      ok: false,
    }
  },
  methods: {
    async sendMail() {
      this.loading = true
      try {
        await this.$axios.post('/auth/send/resetPassword', {
          email: this.email,
        })
        this.errors = []
        this.ok = true
      } catch (error) {
        this.errors = error.response.data.errors
      }
      this.loading = false
    },
  },
}
</script>
