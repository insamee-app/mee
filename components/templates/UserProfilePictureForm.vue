<template>
  <AppCard>
    <AppCardTitle>Modifier ma photo</AppCardTitle>
    <form action="#" @submit.prevent="sendAvatar">
      <ProfilePictureUpdate name="avatar" @file="getAvatar"
        >Changer sa photo de profil</ProfilePictureUpdate
      >
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
  name: 'UserProfilePictureForm',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
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
        console.log(error)
      }
    },
  },
}
</script>
