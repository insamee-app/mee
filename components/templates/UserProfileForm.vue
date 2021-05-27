<template>
  <AppCard closable @close="$emit('close')">
    <AppCardTitle>Modifier mon profil</AppCardTitle>
    <form action="#" class="grid gap-4 grid-cols-1" @submit.prevent="sendUser">
      <AppInput
        v-model="$v.fieldsUser.lastName.$model"
        :error-message="lastNameMessage"
        type="text"
        name="lastName"
        autocomplete="family-name"
        ><template #label>Nom</template></AppInput
      >
      <AppInput
        v-model="$v.fieldsUser.firstName.$model"
        :error-message="firstNameMessage"
        type="text"
        name="firstName"
        autocomplete="given-name"
        ><template #label>Prénom</template></AppInput
      >
      <AppInput
        v-model.number="$v.fieldsUser.graduationYear.$model"
        :error-message="graduationYearMessage"
        type="number"
        name="year"
        autocomplete="year"
        ><template #label>Année de diplomation</template></AppInput
      >
      <div>
        <AppLabel name="focusInterests">Centres d'intérêt</AppLabel>
        <ProfileSelect
          v-model="fieldsUser.focusInterests"
          ressource="focus_interests"
        />
      </div>
      <div>
        <AppLabel name="skills">Compétences</AppLabel>
        <ProfileSelect v-model="fieldsUser.skills" ressource="skills" />
      </div>
      <div>
        <AppLabel name="associations">Associations</AppLabel>
        <ProfileSelect
          v-model="fieldsUser.associations"
          ressource="associations"
          :format="formatAssociations"
        />
      </div>
      <!-- TODO: il faut print l'erreur de la validation (ajouter le composant) -->
      <AppTextarea
        v-model="$v.fieldsUser.text.$model"
        name="presentation"
        placeholder="Présentation"
        :error-message="textMessage"
        >Votre présentation</AppTextarea
      >
      <div class="flex flex-row justify-between">
        <AppButton type="reset" border @click="$emit('close')"
          >Annuler</AppButton
        >
        <AppButton type="submit" :loading="loading" :disabled="$v.$invalid"
          >Enregistrer</AppButton
        >
      </div>
      <AppError :errors="errors" full />
    </form>
  </AppCard>
</template>

<script>
import { numeric, between, maxLength, url } from 'vuelidate/lib/validators'

const date = new Date()

export default {
  name: 'UserProfileForm',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
      loading: false,
      fieldsUser: {
        lastName: '',
        firstName: '',
        currentRole: '',
        text: '',
        mobile: '',
        skills: [],
        focusInterests: [],
        associations: [],
        graduationYear: 0,
        socialNetworks: {
          facebook: '',
          instragram: '',
          twitter: '',
          snapchat: '',
        },
      },
    }
  },
  validations: {
    fieldsUser: {
      lastName: {
        maxLength: maxLength(30),
      },
      firstName: {
        maxLength: maxLength(30),
      },
      text: {
        maxLength: maxLength(2048),
      },
      mobile: {
        numeric,
        maxLength: maxLength(10),
      },
      graduationYear: {
        between: between(1957, date.getFullYear() + 5),
      },
      socialNetworks: {
        facebook: {
          url,
        },
        instragram: {
          url,
        },
        twitter: {
          url,
        },
        snapchat: {
          url,
        },
      },
    },
  },
  computed: {
    transformedUser() {
      const user = {}
      Object.assign(user, this.fieldsUser)

      user.focusInterests = user.focusInterests.map((value) => value.id)
      user.skills = user.skills.map((value) => value.id)
      user.associations = user.associations.map((value) => value.id)

      return user
    },
    lastNameMessage() {
      if (!this.$v.fieldsUser.lastName.$dirty) return ''

      if (!this.$v.fieldsUser.lastName.maxLength) return 'Ce nom est trop long'

      return ''
    },
    firstNameMessage() {
      if (!this.$v.fieldsUser.firstName.$dirty) return ''

      if (!this.$v.fieldsUser.lastName.maxLength)
        return 'Ce prénom est trop long'

      return ''
    },
    graduationYearMessage() {
      if (!this.$v.fieldsUser.graduationYear.$dirty) return ''

      if (!this.$v.fieldsUser.graduationYear.between)
        return "Cette année de diplomation n'est pas valide"

      return ''
    },
    textMessage() {
      if (!this.$v.fieldsUser.text.$dirty) return ''

      if (!this.$v.fieldsUser.text.maxLength)
        return 'Votre présentation est trop longue'

      return ''
    },
  },
  mounted() {
    Object.assign(this.fieldsUser, this.$store.getters['auth/toUpdateUser'])
  },
  methods: {
    formatAssociations({ name, school }) {
      return `${name.toUpperCase()} - ${school.name}`
    },
    async sendUser() {
      this.loading = true
      try {
        const response = await this.$axios.patch(
          `/api/v1/users/${this.userId}`,
          { ...this.transformedUser },
          {
            withCredentials: true,
          }
        )
        this.$store.commit('auth/setUser', response.data)
        this.loading = false
        this.$emit('close')
      } catch (error) {
        this.loading = false
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>
