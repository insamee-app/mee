import { helpers, maxLength, required, sameAs } from 'vuelidate/lib/validators'

const strength = helpers.regex(
  'strength',
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
)

export default {
  validations: {
    password: {
      required,
      maxLength: maxLength(30),
      strength,
    },
    password_confirmation: {
      required,
      sameAs: sameAs('password'),
    },
  },
  computed: {
    passwordMessage() {
      if (!this.$v.password.$dirty) return ''

      if (!this.$v.password.required) return 'Un mot de passe est requis'
      if (!this.$v.password.maxLength) return 'Ce mot de passe est trop long'
      if (!this.$v.password.strength)
        return 'Le mot de passe doit contenir 8 caractères, une majuscule et un chiffre'

      return ''
    },
    passwordConfirmationMessage() {
      if (!this.$v.password_confirmation.$dirty) return ''

      if (!this.$v.password_confirmation.required)
        return 'Un mot de passe de confirmation est requis'
      if (!this.$v.password_confirmation.sameAs)
        return "La confirmation n'est pas identique au mot de passe"

      return ''
    },
  },
}
