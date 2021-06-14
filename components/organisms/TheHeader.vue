<template>
  <InsameeHeader :icon-link="iconLink" @open="open">
    <template #actions>
      <div>
        <InsameeAppButton v-if="loggedIn()" :to="{ name: 'mee' }">
          Trouver des mee
        </InsameeAppButton>
        <InsameeAppButton v-else border :to="{ name: 'signin' }">
          S'incrire
        </InsameeAppButton>
      </div>
    </template>
  </InsameeHeader>
</template>

<script>
import { mapGetters } from 'vuex'

console.log('the header')

export default {
  name: 'TheHeader',
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
