<template>
  <InsameeNavMobile :list="nav" :value="value" @close="close">
    <template #actions>
      <template v-if="loggedIn()">
        <InsameeAppButton @click="logout"> Se déconnecter </InsameeAppButton>
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
