<template>
  <InsameeAppCard>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle> Modifier ma photo </InsameeAppCardTitle>
      </InsameeAppCardHeader>
    </template>
    <form action="#" @submit.prevent="sendAvatar">
      <ProfilePictureUpdate name="avatar" @file="getAvatar">
        <div class="flex flex-row items-center hover:text-primary-dark">
          <IconUpload class="w-5 h-5 text-primary-dark fill-current mr-2" />
          Changer sa photo de profil
        </div>
      </ProfilePictureUpdate>
      <div class="flex flex-row justify-between mt-4">
        <InsameeAppButton type="reset" border @click="$emit('close')">
          Annuler
        </InsameeAppButton>
        <InsameeAppButton type="submit"> Enregistrer </InsameeAppButton>
      </div>
      <InsameeAppListError :errors="errors" />
    </form>
  </InsameeAppCard>
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
          '/api/v1/profiles/' + this.userId,
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
