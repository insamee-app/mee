<template>
  <AppContainer class="mb-4">
    <h1 class="text-xl font-bold">Mon Profil</h1>
    <UserProfile :user="user" class="mt-2" />
    <section class="mt-4">
      <span class="text-grey-base font-light">Me Contacter</span>
      <AppContact :links="socials" />
    </section>
    <section class="flex flex-row justify-between sticky bottom-4 mt-8">
      <InsameeAppButton large border @click="editAvatar = true">
        Changer la photo
      </InsameeAppButton>
      <InsameeAppButton large @click="editUser = true">
        Editer le profil
      </InsameeAppButton>
    </section>
    <section>
      <h2 class="text-xl font-bold mt-8">Paramètre du Compte</h2>
      <div class="flex flex-col items-center">
        <InsameeAppButton
          class="mt-4"
          :disabled="loadingResetPassword"
          :loading="loadingResetPassword"
          @click="resetPassword"
        >
          Modifier son mot de passe
        </InsameeAppButton>
        <InsameeAppButton border class="mt-4" @click="deleteAccount">
          Supprimer son compte
        </InsameeAppButton>
        <InsameeAppListError :errors="errors" class="mt-2" />
      </div>
    </section>
    <InsameeAppModal v-model="editUser"
      ><UserProfileForm :user-id="user.id" @close="editUser = false"
    /></InsameeAppModal>
    <InsameeAppModal :value="editAvatar" @outside="editAvatar = false"
      ><UserProfilePictureForm :user-id="user.id" @close="editAvatar = false"
    /></InsameeAppModal>
    <InsameeAppModal
      :value="resetPasswordInfo"
      @outside="resetPasswordInfo = false"
    >
      <InsameeAppCard closable justify @close="resetPasswordInfo = false">
        <template #header>Information</template>
        Un courriel vous a été envoyé afin de vous permettre de modifier votre
        mot de passe.
      </InsameeAppCard>
    </InsameeAppModal>
  </AppContainer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

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
    ...mapGetters({ socials: 'auth/socialNetworks' }),
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
