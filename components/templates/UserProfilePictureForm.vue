<template>
  <AppCard>
    <AppCardTitle>Modifier ma photo</AppCardTitle>
    <form action="#" @submit.prevent="sendAvatar">
      <ProfilePictureUpdate name="avatar" @file="getAvatar"
        ><div class="flex flex-row items-center mt-4 hover:text-primary-dark">
          <IconUpload
            class="w-5 h-5 text-primary-dark fill-current mr-2"
          />Changer sa photo de profil
        </div>
      </ProfilePictureUpdate>
      <div class="flex flex-row justify-between mt-4">
        <AppButton type="reset" border @click="$emit('close')"
          >Annuler</AppButton
        >
        <AppButton type="submit">Enregistrer</AppButton>
      </div>
      <AppError :errors="errors" />
    </form>
  </AppCard>
</template>

<script>
export default {
  name: 'UserProfilePictureForm',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      errors: [],
      avatar: undefined,
    }
  },
  methods: {
    getAvatar(value) {
      this.avatar = value
    },
    async sendAvatar() {
      const formData = new FormData()
      formData.append('avatar', this.avatar)

      try {
        const response = await this.$axios.patch(
          '/api/v1/users/' + this.userId,
          formData,
          {
            withCredentials: true,
          }
        )
        this.$store.commit('auth/setUser', response.data)
        this.$emit('close')
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>
