<template>
  <InsameeHeader
    :icon-link="iconLink"
    :icon-nav="!$screen.sm"
    class="max-w-7xl left-1/2 transform -translate-x-1/2"
    @open="open"
  >
    <template #nav>
      <InsameeHeaderNav v-if="$screen.md">
        <InsameeAppList :list="nav" row />
      </InsameeHeaderNav>
    </template>
    <template #actions>
      <InsameeAppButton v-if="loggedIn()" :to="{ name: 'mee' }">
        Trouver des mee
      </InsameeAppButton>
      <InsameeAppButton
        v-if="!loggedIn() && $screen.sm"
        empty
        class="text-primary-base"
        :to="{ name: 'login' }"
      >
        Se connecter
      </InsameeAppButton>
      <InsameeAppButton v-if="!loggedIn()" border :to="{ name: 'signup' }">
        S'incrire
      </InsameeAppButton>
    </template>
  </InsameeHeader>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  props: {
    nav: {
      type: Array,
      default: () => undefined,
    },
  },
  data() {
    return {
      iconLink: { name: 'index' },
    }
  },
  methods: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
    open() {
      this.$emit('open', true)
    },
  },
}
</script>
