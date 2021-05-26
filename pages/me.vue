<template>
  <AppContainer>
    <UserProfile :user="user" />
    <section v-if="socials.length" class="mb-4">
      <h2 class="text-2xl font-bold mb-2">Moyen pour me contacter</h2>
      <AppContact :links="socials" />
    </section>
    <div class="flex flex-row justify-between sticky bottom-4 mb-4">
      <AppButton large border @click="editAvatar = true"
        >Changer la photo</AppButton
      >
      <AppButton large @click="editUser = true">Editer le profil</AppButton>
    </div>
    <div class="mb-4">
      <h2 class="text-2xl font-bold mb-4">Zone de danger</h2>
      <div class="flex flex-col items-center">
        <AppButton large class="mb-4">Modifier son mot de passe</AppButton>
        <AppButton large border>Supprimer son compte</AppButton>
      </div>
    </div>
    <AppModal v-model="editUser"
      ><UserProfileForm :user-id="user.id" @close="editUser = false"
    /></AppModal>
    <AppModal v-model="editAvatar"
      ><UserProfilePictureForm :user-id="user.id" @close="editAvatar = false"
    /></AppModal>
  </AppContainer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['authenticated'],
  data() {
    return {
      editUser: false,
      editAvatar: false,
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
}
</script>
