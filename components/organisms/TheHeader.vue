<template>
  <InsameeHeader
    :name-link="{ name: 'index' }"
    :icon-nav="!$screen.md"
    @open="$emit('open', $event)"
  >
    <template #name>
      <template v-if="$screen.md"> Insamee </template>
      <template v-else> <InsameeIconInsamee class="w-6 h-6" /> </template>
    </template>
    <template #nav>
      <InsameeHeaderNav v-if="$screen.md">
        <InsameeAppList :list="nav" row />
      </InsameeHeaderNav>
    </template>
    <template #actions>
      <template v-if="loggedIn()">
        <InsameeAppButton :to="{ name: 'mee' }">
          Trouver des mee
        </InsameeAppButton>
        <InsameeAppTeam
          v-if="$screen.md"
          :link-tutorat="$config.tutoratURL"
          link-evenements="/"
          :link-associations="$config.associationsURL"
          link-insamee="/"
        />
      </template>
      <InsameeAppButton
        v-if="!loggedIn() && $screen.md"
        empty
        variant="secondary"
        :to="{ name: 'login' }"
      >
        Se connecter
      </InsameeAppButton>
      <InsameeAppButton v-if="!loggedIn()" border :to="{ name: 'signup' }">
        S'inscrire
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
      default: () => [],
    },
  },
  methods: {
    ...mapGetters({ loggedIn: 'auth/loggedIn' }),
  },
}
</script>
