<template>
  <InsameeHeader
    :icon-link="iconLink"
    :icon-nav="!$screen.sm"
    class="max-w-7xl left-1/2 transform -translate-x-1/2"
    @open="open"
  >
    <template #nav>
      <InsameeAppList v-if="$screen.sm" :list="nav" row />
    </template>
    <template #actions>
      <div class="flex flex-row space-x-4">
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
        <InsameeAppButton v-if="!loggedIn()" border :to="{ name: 'signin' }">
          S'incrire
        </InsameeAppButton>
      </div>
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
