import { email, required } from 'vuelidate/lib/validators'

export default {
  validations: {
    email: {
      required,
      email,
    },
  },
  computed: {
    mailMessage() {
      if (!this.$v.email.$dirty) return ''

      if (!this.$v.email.required) return 'Une adresse mail est requise'
      if (!this.$v.email.email) return "Cette adresse n'est pas valide"

      return ''
    },
  },
}
