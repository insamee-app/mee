<template>
  <AppCard>
    <AppCardTitle>Modifier mon profil</AppCardTitle>
    <form action="#" class="grid gap-4 grid-cols-1" @submit.prevent="sendUser">
      <AppInput v-model="fieldsUser.lastName" type="text" name="lastName"
        ><template #label>Nom</template></AppInput
      >
      <AppInput v-model="fieldsUser.firstName" type="text" name="firstName"
        ><template #label>Prénom</template></AppInput
      >
      <AppInput
        v-model.number="fieldsUser.graduationYear"
        type="number"
        name="year"
        ><template #label>Année de diplomation</template></AppInput
      >
      <div>
        <AppLabel name="skills" text="Compétences" />

        <ProfileSelect
          v-model="fieldsUser.focusInterests"
          ressource="focus_interests"
        />
      </div>
      <div>
        <AppLabel name="skills" text="Compétences" />
        <ProfileSelect v-model="fieldsUser.skills" ressource="skills" />
      </div>
      <div>
        <AppLabel name="associations" text="Associations" />
        <ProfileSelect
          v-model="fieldsUser.associations"
          ressource="associations"
          :format="formatAssociations"
        />
      </div>
      <AppTextarea v-model="fieldsUser.text" placeholder="Présentation" />
      <div class="flex flex-row justify-between">
        <AppButton type="reset" border @click="$emit('close')"
          >Annuler</AppButton
        >
        <AppButton type="submit">Enregistrer</AppButton>
      </div>
    </form>
  </AppCard>
</template>

<script>
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
  computed: {
    transformedUser() {
      const user = {}
      Object.assign(user, this.fieldsUser)

      user.focusInterests = user.focusInterests.map((value) => value.id)
      user.skills = user.skills.map((value) => value.id)
      user.associations = user.associations.map((value) => value.id)

      return user
    },
  },
  mounted() {
    this.fieldsUser = this.$store.getters['auth/toUpdateUser']
  },
  methods: {
    formatAssociations({ name, school }) {
      return `${name.toUpperCase()} - ${school.name}`
    },
    async sendUser() {
      try {
        const response = await this.$axios.patch(
          `/api/v1/users/${this.userId}`,
          { ...this.transformedUser },
          {
            withCredentials: true,
          }
        )
        this.$store.commit('auth/setUser', response.data)
        this.$emit('close')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
