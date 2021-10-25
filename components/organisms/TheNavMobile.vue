<template>
  <InsameeNavMobile :list="nav" :value="value" @close="close">
    <template #actions>
      <template v-if="loggedIn()">
        <div class="flex flex-col justify-center items-center">
          <AppTeam />
          <InsameeAppButton
            class="mt-6"
            :disabled="loadingLogout"
            :loading="loadingLogout"
            @click="logout"
          >
            Se déconnecter
          </InsameeAppButton>
        </div>
      </template>
      <template v-else>
        <InsameeAppButton :to="{ name: 'login' }" variant="secondary">
          Se connecter
        </InsameeAppButton>
        <InsameeAppButton border :to="{ name: 'signup' }">
          S'inscrire
        </InsameeAppButton>
      </template>
    </template>
    <template #errors>
      <InsameeAppError :error-message="errorMessage" />
    </template>
  </InsameeNavMobile>
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
    nav: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      errorMessage: '',
      loadingLogout: false,
    }
  },
  methods: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
    ...mapActions(['auth/logout']),
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
    close() {
      this.$emit('close', false)
    },
  },
}
</script>
