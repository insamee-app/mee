<template>
  <section class="text-center">
    <template v-if="error.statusCode === 404">
      <Insamee404 :error="error" :to="{ name: 'associations' }">
        Trouver un mee ?
      </Insamee404>
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
  layout: 'minimal',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
