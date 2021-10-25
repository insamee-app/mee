<template>
  <section class="text-center">
    <template v-if="error.statusCode === 404">
      <InsameeError404 :error="error" :to="{ name: 'mee' }">
        Trouver un mee ?
      </InsameeError404>
    </template>
    <template v-else>
      <InsameeErrorGlobal :error="error" :to="{ name: 'index' }">
        <template #fixing-bug="{ classNames }">
          <GraphicFixingBug :class="classNames" />
        </template>
        <span class="text-white-base"> Accueil </span>
      </InsameeErrorGlobal>
    </template>
  </section>
</template>

<script>
export default {
  layout: 'minimal-overflow',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    return {
      title: this.error.statusCode === 404 ? 'Page introuvable' : 'Erreur',
    }
  },
}
</script>
