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
      <AppSelect
        v-model="$v.fieldsUser.currentRole.$model"
        name="currentRole"
        :items="currentRoles"
        label="Rôles"
        choose-text
      />
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
      <AppInput
        v-model="$v.fieldsUser.urlFacebook.$model"
        :error-message="facebookMessage"
        type="url"
        name="facebook"
        ><template #label>Profil facebook</template></AppInput
      >
      <AppInput
        v-model="$v.fieldsUser.urlInstagram.$model"
        :error-message="facebookMessage"
        type="url"
        name="instagram"
        ><template #label>Profil instagram</template></AppInput
      >
      <AppInput
        v-model="$v.fieldsUser.urlTwitter.$model"
        :error-message="facebookMessage"
        type="url"
        name="twitter"
        ><template #label>Profil twitter</template></AppInput
      >
      <AppInput
        v-model="$v.fieldsUser.mobile.$model"
        :error-message="mobileMessage"
        type="phone"
        name="mobile"
        autocomplete="phone"
        ><template #label>Téléphone</template></AppInput
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
import { mapState } from 'vuex'
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
        urlFacebook: '',
        urlInstagram: '',
        urlTwitter: '',
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
      currentRole: {},
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
      // TODO: ajouter une regex pour vérifier que c'est bien une lien de là et il faut faire de même pour le serveur
      urlFacebook: {
        url,
      },
      urlInstagram: {
        url,
      },
      urlTwitter: {
        url,
      },
    },
  },
  computed: {
    ...mapState({ currentRoles: (state) => state.data.currentRoles }),
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
    facebookMessage() {
      if (!this.$v.fieldsUser.urlFacebook.$dirty) return ''

      if (!this.$v.fieldsUser.urlFacebook.url)
        return "Vous devez saisir l'url de votre profil"

      return ''
    },
    instagramMessage() {
      if (!this.$v.fieldsUser.urlInstagram.$dirty) return ''

      if (!this.$v.fieldsUser.urlInstagram.url)
        return "Vous devez saisir l'url de votre profil"

      return ''
    },
    twitterMessage() {
      if (!this.$v.fieldsUser.urlTwitter.$dirty) return ''

      if (!this.$v.fieldsUser.urlTwitter.url)
        return "Vous devez saisir l'url de votre profil"

      return ''
    },
    mobileMessage() {
      if (!this.$v.fieldsUser.mobile.$dirty) return ''

      if (!this.$v.fieldsUser.mobile.numeric)
        return 'Votre numéro doit contenir des chiffres'

      if (!this.$v.fieldsUser.mobile.maxLength)
        return 'Votre numéro est trop long'

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
