<template>
  <div
    v-if="value"
    class="fixed top-0 bottom-0 right-0 left-0 z-10 flex flex-row justify-end"
  >
    <div class="absolute w-full h-full" @click="close"></div>
    <div class="relative h-full w-8/12 bg-white">
      <div class="flex justify-end pt-4 px-4 pb-6">
        <div @click="close">
          <IconDismiss class="text-primary-base h-8 w-8 fill-current" />
        </div>
      </div>
      <AppList class="px-4 mb-8" :list="nav"></AppList>
      <div class="flex justify-center">
        <template v-if="loggedIn()">
          <AppButton class="mr-6" @click="logout">Se déconnecter</AppButton>
        </template>
        <template v-else>
          <AppButton class="mr-6" :to="{ name: 'login' }"
            >Se connecter</AppButton
          >
          <AppButton border :to="{ name: 'signin' }">S'inscrire</AppButton>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'TheNavMobile',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    nav() {
      const nav = [
        {
          name: 'Trouver des Mee',
          path: 'mee',
        },
        {
          name: 'Contact',
          path: 'contact',
        },
      ]
      nav.unshift(
        this.loggedIn()
          ? { name: 'Mon profil', path: 'me' }
          : { name: 'Acceuil', path: 'index' }
      )
      return nav
    },
  },
  methods: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
    ...mapActions(['auth/logout']),
    async logout() {
      try {
        await this.$axios.post('/auth/logout', {}, { withCredentials: true })
        this['auth/logout']()
        this.$router.push({ name: 'index' })
      } catch (error) {
        console.error(error)
      }
    },
    close() {
      this.$emit('input', false)
    },
  },
}
</script>
