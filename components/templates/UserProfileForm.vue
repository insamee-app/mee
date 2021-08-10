<template>
  <InsameeAppCard>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle> Modifier mon profil</InsameeAppCardTitle>
      </InsameeAppCardHeader>
    </template>
    <form action="#" class="grid gap-4 grid-cols-1" @submit.prevent="sendUser">
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.lastName.$model"
        :error-message="lastNameMessage"
        type="text"
        name="lastName"
        autocomplete="family-name"
        label="Nom"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.firstName.$model"
        :error-message="firstNameMessage"
        type="text"
        name="firstName"
        autocomplete="given-name"
        label="Prénom"
      />
      <InsameeLabeledItem
        label="Le rôle"
        variant="secondary"
        class="mt-2"
        class-name="text-base"
      >
        <InsameeSelect
          :value="$v.fieldsProfile.currentRole.$model"
          :dismiss-value="dismissSelect"
          :items="$store.getters['data/currentRoles']"
          placeholder="Sélectionner un rôle"
          variant="primary"
          @selected="$v.fieldsProfile.currentRole.$model = $event"
        />
      </InsameeLabeledItem>
      <InsameeLabeledInput
        v-model.number="$v.fieldsProfile.graduationYear.$model"
        :error-message="graduationYearMessage"
        type="number"
        name="year"
        autocomplete="year"
        label="Année de diplomation"
      />
      <InsameeLabeledItem label="Les centres d'intérêt" class-name="text-base">
        <ComboboxMultiple
          variant="primary"
          placeholder="Selectionner un / des centres d'intérêts"
          name="focusInterests"
          :value="$v.fieldsProfile.focusInterests.$model"
          @selected="$v.fieldsProfile.focusInterests.$model = $event"
          @update="updateCombobox"
        />
      </InsameeLabeledItem>
      <InsameeLabeledItem label="Les compétences" class-name="text-base">
        <ComboboxMultiple
          variant="primary"
          placeholder="Selectionner une / des compétences"
          name="skills"
          :value="$v.fieldsProfile.skills.$model"
          @selected="$v.fieldsProfile.skills.$model = $event"
          @update="updateCombobox"
        />
      </InsameeLabeledItem>
      <InsameeLabeledItem label="Les associations" class-name="text-base">
        <ComboboxMultiple
          variant="primary"
          placeholder="Selectionner une / des associations"
          name="associations"
          :value="$v.fieldsProfile.associations.$model"
          @selected="$v.fieldsProfile.associations.$model = $event"
          @update="updateCombobox"
        />
      </InsameeLabeledItem>
      <InsameeLabeledTextarea
        v-model="$v.fieldsProfile.text.$model"
        name="presentation"
        placeholder="Présentation"
        :error-message="textMessage"
        label="Votre présentation"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.urlFacebook.$model"
        :error-message="facebookMessage"
        type="url"
        name="facebook"
        label="Profil facebook"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.urlInstagram.$model"
        :error-message="instagramMessage"
        type="url"
        name="instagram"
        label="Profil instagram"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.urlTwitter.$model"
        :error-message="twitterMessage"
        type="url"
        name="twitter"
        label="Profil twitter"
      />
      <InsameeLabeledInput
        v-model="$v.fieldsProfile.mobile.$model"
        :error-message="mobileMessage"
        type="phone"
        name="mobile"
        autocomplete="phone"
        label="Téléphone"
      />
      <div class="flex flex-row justify-between">
        <InsameeAppButton type="reset" border @click="$emit('close')">
          Annuler
        </InsameeAppButton>
        <InsameeAppButton
          type="submit"
          :loading="loading"
          :disabled="$v.$invalid"
        >
          Enregistrer
        </InsameeAppButton>
      </div>
      <InsameeAppListError :errors="errors" full />
    </form>
  </InsameeAppCard>
</template>

<script>
import {
  numeric,
  between,
  maxLength,
  url,
  helpers,
} from 'vuelidate/lib/validators'

// Used to check if a value is in the item
const mustContain = (value) => {
  const regex = new RegExp(value, 'i')
  return helpers.regex('mustContain', regex)
}

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
      fieldsProfile: {
        lastName: '',
        firstName: '',
        currentRole: {},
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
    fieldsProfile: {
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
      urlFacebook: {
        url,
        mustContain: mustContain('facebook'),
      },
      urlInstagram: {
        url,
        mustContain: mustContain('instagram'),
      },
      urlTwitter: {
        url,
        mustContain: mustContain('twitter'),
      },
      focusInterests: {},
      skills: {},
      associations: {},
    },
  },
  computed: {
    transformedProfile() {
      const profile = {}
      Object.assign(profile, this.fieldsProfile)

      profile.focusInterests = profile.focusInterests.map((el) => el.value)
      profile.skills = profile.skills.map((el) => el.value)
      profile.associations = profile.associations.map((el) => el.value)
      profile.currentRole = profile.currentRole.value

      return profile
    },
    dismissSelect() {
      return this.fieldsProfile.currentRole.value ?? ''
    },
    lastNameMessage() {
      if (!this.$v.fieldsProfile.lastName.$dirty) return ''

      if (!this.$v.fieldsProfile.lastName.maxLength)
        return 'Ce nom est trop long'

      return ''
    },
    firstNameMessage() {
      if (!this.$v.fieldsProfile.firstName.$dirty) return ''

      if (!this.$v.fieldsProfile.lastName.maxLength)
        return 'Ce prénom est trop long'

      return ''
    },
    graduationYearMessage() {
      if (!this.$v.fieldsProfile.graduationYear.$dirty) return ''

      if (!this.$v.fieldsProfile.graduationYear.between)
        return "Cette année de diplomation n'est pas valide"

      return ''
    },
    textMessage() {
      if (!this.$v.fieldsProfile.text.$dirty) return ''

      if (!this.$v.fieldsProfile.text.maxLength)
        return 'Votre présentation est trop longue'

      return ''
    },
    facebookMessage() {
      if (!this.$v.fieldsProfile.urlFacebook.$dirty) return ''

      if (!this.$v.fieldsProfile.urlFacebook.url)
        return "Vous devez saisir l'url de votre profil"

      if (!this.$v.fieldsProfile.urlFacebook.mustContain)
        return 'Vous devez saisir une url provenant de Facebook'

      return ''
    },
    instagramMessage() {
      if (!this.$v.fieldsProfile.urlInstagram.$dirty) return ''

      if (!this.$v.fieldsProfile.urlInstagram.url)
        return "Vous devez saisir l'url de votre profil"

      if (!this.$v.fieldsProfile.urlInstagram.mustContain)
        return "Vous devez saisir une url provenant d'Instagram"

      return ''
    },
    twitterMessage() {
      if (!this.$v.fieldsProfile.urlTwitter.$dirty) return ''

      if (!this.$v.fieldsProfile.urlTwitter.url)
        return "Vous devez saisir l'url de votre profil"

      if (!this.$v.fieldsProfile.urlTwitter.mustContain)
        return 'Vous devez saisir une url provenant de Twitter'

      return ''
    },
    mobileMessage() {
      if (!this.$v.fieldsProfile.mobile.$dirty) return ''

      if (!this.$v.fieldsProfile.mobile.numeric)
        return 'Votre numéro doit contenir des chiffres'

      if (!this.$v.fieldsProfile.mobile.maxLength)
        return 'Votre numéro est trop long'

      return ''
    },
  },
  mounted() {
    Object.assign(
      this.fieldsProfile,
      this.$store.getters['auth/toUpdateProfile']
    )

    const profileData = this.$store.getters['auth/currentRole']
    const data = this.$store.getters['data/currentRoles']
    this.fieldsProfile.currentRole =
      data.find((el) => el.value === profileData) ?? {}
  },
  methods: {
    updateCombobox(name) {
      const profileData = this.$store.getters[`auth/${name}`]
      const data = this.$store.getters[`data/${name}`]
      this.$v.fieldsProfile[name].$model = data.filter((el) =>
        profileData.includes(el.value)
      )
    },
    formatAssociations({ name, school }) {
      return `${name.toUpperCase()} - ${school.name}`
    },
    async sendUser() {
      this.loading = true
      try {
        const response = await this.$axios.patch(
          `/api/v1/profiles/${this.userId}?populate=insamee`,
          { ...this.transformedProfile }
        )
        this.$store.commit('auth/setProfile', response.data)
        this.$emit('close')
      } catch (error) {
        this.errors = error.response.data.errors
      }
      this.loading = false
    },
  },
}
</script>
