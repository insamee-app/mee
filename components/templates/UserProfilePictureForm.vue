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
      <button
        class="
          flex flex-row
          items-center
          text-grey-base
          hover:text-primary-dark
          mt-2
        "
      >
        <InsameeIconDismiss
          class="w-5 h-5 text-primary-dark fill-current mr-2"
        />
        Supprimer sa photo de profil
      </button>
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
      avatar: null,
    }
  },
  methods: {
    getAvatar(value) {
      this.avatar = value || null
    },
    async sendAvatar() {
      const formData = new FormData()
      formData.append('avatar', this.avatar)

      try {
        const response = await this.$axios.patch(
          `/api/v1/profiles/${this.userId}/profiles-pictures`,
          this.avatar ? formData : {}
        )
        this.$store.commit('auth/setProfile', response.data)
        this.$emit('close')
      } catch (error) {
        this.errors = error.response.data.errors
      }
    },
  },
}
</script>
