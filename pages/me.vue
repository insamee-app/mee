<template>
  <InsameeAppContainer class="max-w-4xl mx-auto">
    <h1 class="text-xl font-bold mt-4">Mon Profil</h1>
    <InsameeProfile
      :last-name="profile.last_name"
      :first-name="profile.first_name"
      :email="profile.user.email"
      :school-name="profile.school.name"
      :graduation-year="profile.graduation_year"
      :current-role="profile.current_role"
      :avatar-url="profile.avatarUrl"
      :skills="getTexts(profile.insameeProfile.skills)"
      :focus-interests="getTexts(profile.insameeProfile.focusInterests)"
      :associations="profile.insameeProfile.associations"
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
    <InsameeAppModal
      v-slot="{ size }"
      v-model="editProfile"
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
      <InsameeAppCard :class="size" justify>
        <template #header>
          <InsameeAppCardHeader closable @close="resetPasswordInfo = false">
            <InsameeAppCardTitle> Information</InsameeAppCardTitle>
          </InsameeAppCardHeader>
        </template>
        <div>
          Un courriel vous a été envoyé afin de vous permettre de modifier votre
          mot de passe.
        </div>
      </InsameeAppCard>
    </InsameeAppModal>
  </InsameeAppContainer>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  filters: {
    handleUndefined(value) {
      return value || 'Non renseigné'
    },
  },
  middleware: ['authenticated'],
  data() {
    return {
      loadingResetPassword: false,
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
    getTexts(tab) {
      if (!tab || tab.length === 0) return []

      const data = []
      for (const item of tab) {
        data.push(item.name)
      }
      return data
    },
    async resetPassword() {
      this.loadingResetPassword = true
      try {
        await this.$axios.post(
          '/auth/send/resetPassword',
          { email: this.profile.user.email },
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
          await this.$axios.delete(`/api/v1/users/${this.profile.user_id}`, {
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
