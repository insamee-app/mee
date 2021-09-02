<template>
  <InsameeAppContainer class="max-w-4xl mx-auto">
    <!-- <h1 class="text-xl font-bold mt-4">Mon Profil</h1> -->
    <InsameeProfile
      class="mt-4"
      :last-name="profile.last_name"
      :first-name="profile.first_name"
      :email="profile.user.email"
      :school-name="profile.school.name"
      :graduation-year="profile.graduation_year"
      :current-role="profile.current_role"
      :avatar-url="profile.url_picture"
      :skills="getTexts(profile.insamee_profile.skills)"
      :focus-interests="getTexts(profile.insamee_profile.focus_interests)"
      :associations="profile.insamee_profile.associations"
      :text="profile.insamee_profile.text"
    >
      <InsameeProfileContact :links="socials" />
    </InsameeProfile>
    <section class="flex flex-row justify-between sticky bottom-4 mt-8">
      <InsameeAppButton large border @click="editAvatar = true">
        Changer la photo
      </InsameeAppButton>
      <InsameeAppButton large @click="editProfile = true">
        Editer le profil
      </InsameeAppButton>
    </section>
    <section>
      <h2 class="text-xl font-bold mt-8">Paramètre du Compte</h2>
      <div class="flex flex-col items-center space-y-4">
        <InsameeAppButton
          class="mt-4"
          :disabled="loadingResetPassword"
          :loading="loadingResetPassword"
          @click="resetPassword"
        >
          Modifier son mot de passe
        </InsameeAppButton>
        <InsameeAppButton
          :loading="loadingLogout"
          :disabled="loadingLogout"
          @click="logout"
        >
          Se déconnecter
        </InsameeAppButton>
        <InsameeAppButton
          border
          :loading="loadingDeleteAccount"
          :disabled="loadingDeleteAccount"
          @click="deleteAccount"
        >
          Supprimer son compte
        </InsameeAppButton>
        <InsameeAppListError :errors="errors" class="mt-2" />
      </div>
    </section>
    <Portal v-if="editProfile || editAvatar || resetPasswordInfo">
      <InsameeAppModal
        v-slot="{ size }"
        v-model="editProfile"
        overflow
        @outside="editProfile = false"
      >
        <UserProfileForm
          :class="size"
          :user-id="profile.user_id"
          @close="editProfile = false"
        />
      </InsameeAppModal>
      <InsameeAppModal
        v-slot="{ size }"
        :value="editAvatar"
        @outside="editAvatar = false"
      >
        <UserProfilePictureForm
          :class="size"
          :user-id="profile.user_id"
          @close="editAvatar = false"
        />
      </InsameeAppModal>
      <InsameeAppModal
        v-slot="{ size }"
        :value="resetPasswordInfo"
        @outside="resetPasswordInfo = false"
      >
        <ResetPasswordCard :class="size" @close="resetPasswordInfo = false" />
      </InsameeAppModal>
    </Portal>
  </InsameeAppContainer>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import getTexts from '@/mixins/getTexts'
import { Portal } from '@linusborg/vue-simple-portal'

export default {
  components: { Portal },
  filters: {
    handleUndefined(value) {
      return value || 'Non renseigné'
    },
  },
  mixins: [getTexts],
  middleware: ['authenticated'],
  data() {
    return {
      loadingDeleteAccount: false,
      loadingResetPassword: false,
      loadingLogout: false,
      errors: [],
      editProfile: false,
      editAvatar: false,
      resetPasswordInfo: false,
    }
  },
  computed: {
    ...mapState({ profile: (state) => state.auth.profile }),
    ...mapGetters({ socials: 'auth/socialNetworks' }),
  },
  methods: {
    ...mapActions(['auth/logout']),
    async resetPassword() {
      this.loadingResetPassword = true
      try {
        await this.$axios.post(
          '/auth/send/resetPassword',
          { email: this.profile.user.email },
          { withCredentials: true }
        )
        this.resetPasswordInfo = true
      } catch (error) {
        this.errors = error.response.data.errors
      }
      this.loadingResetPassword = false
    },
    async logout() {
      this.loadingLogout = true
      try {
        await this['auth/logout']()
        this.errorMessage = ''
      } catch (error) {
        this.errorMessage = error.message
      }
      this.loadingLogout = false
    },
    async deleteAccount() {
      const confirmed = confirm('Voulez-vous vraiment supprimer votre compte ?')

      if (confirmed) {
        this.loadingDeleteAccount = true
        try {
          await this.$axios.delete(`/api/v1/users/${this.profile.user_id}`, {
            withCredentials: true,
          })
          this.$store.dispatch('auth/logout')
          this.$router.push({ name: 'index' })
        } catch (error) {
          this.errors = error.response.data.errors
        }
        this.loadingDeleteAccount = false
      }
    },
  },
}
</script>
