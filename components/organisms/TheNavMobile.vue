<template>
  <InsameeNavMobile :list="nav" :value="value" @close="close">
    <template #actions>
      <template v-if="loggedIn()">
        <InsameeAppButton
          :disabled="loadingLogout"
          :loading="loadingLogout"
          @click="logout"
        >
          Se déconnecter
        </InsameeAppButton>
      </template>
      <template v-else>
        <InsameeAppButton class="mr-6" :to="{ name: 'login' }">
          Se connecter
        </InsameeAppButton>
        <InsameeAppButton border :to="{ name: 'signin' }">
          S'inscrire
        </InsameeAppButton>
      </template>
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
      required: true,
    },
  },
  data() {
    return {
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
      this.$emit('input', false)
    },
  },
}
</script>
