<template>
  <AppContainer>
    <UserProfile :user="user" />
    <section v-if="socials.length" class="mt-4">
      <h2 class="text-2xl font-bold mb-2">Moyen pour me contacter</h2>
      <AppContact :links="socials" />
    </section>
    <div class="flex flex-row justify-between sticky bottom-4 mt-4">
      <AppButton large border @click="editAvatar = true"
        >Changer la photo</AppButton
      >
      <AppButton large @click="editUser = true">Editer le profil</AppButton>
    </div>
    <div class="mb-4">
      <h2 class="text-2xl font-bold mt-4">Zone de danger</h2>
      <div class="flex flex-col items-center">
        <AppButton
          large
          class="mt-4"
          :disabled="loadingResetPassword"
          :loading="loadingResetPassword"
          @click="resetPassword"
          >Modifier son mot de passe</AppButton
        >
        <AppButton large border class="mt-4" @click="deleteAccount"
          >Supprimer son compte</AppButton
        >
        <AppError :errors="errors" class="mt-2" />
      </div>
    </div>
    <AppModal v-model="editUser"
      ><UserProfileForm :user-id="user.id" @close="editUser = false"
    /></AppModal>
    <AppModal v-model="editAvatar"
      ><UserProfilePictureForm :user-id="user.id" @close="editAvatar = false"
    /></AppModal>
    <AppModal v-model="resetPasswordInfo">
      <AppCard closable @close="resetPasswordInfo = false">
        <AppCardTitle>Information</AppCardTitle>
        <AppCardText
          >Un courriel vous a été envoyé afin de vous permettre de modifier
          votre mot de passe.</AppCardText
        >
      </AppCard>
    </AppModal>
  </AppContainer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['authenticated'],
  data() {
    return {
      loadingResetPassword: false,
      errors: [],
      editUser: false,
      editAvatar: false,
      resetPasswordInfo: false,
    }
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    socials() {
      const data = {
        ...this.user.social_networks,
      }
      if (this.user.mobile) data.tel = this.user.mobile

      return data
    },
  },
  methods: {
    async resetPassword() {
      this.loadingResetPassword = true
      try {
        await this.$axios.post(
          '/auth/send/resetPassword',
          { email: this.user.email },
          { withCredentials: true }
        )
        this.resetPasswordInfo = true
        this.loadingResetPassword = false
      } catch (error) {
        this.loading = false
        this.errors = error.response.data.errors
      }
    },
    async deleteAccount() {
      const confirmed = confirm('Voulez-vous vraiment supprimer votre compte ?')

      if (confirmed) {
        try {
          await this.$axios.delete(`/api/v1/users/${this.user.id}`, {
            withCredentials: true,
          })
          this.$store.dispatch('auth/logout')
          this.$router.push({ name: 'index' })
        } catch (error) {
          this.errors = error.response.data.errors
        }
      }
    },
  },
}
</script>
