<template>
  <section class="text-center">
    <template v-if="error.statusCode === 404">
      <Insamee404 :error="error" :to="{ name: 'index' }"> Acceuil </Insamee404>
    </template>
    <template v-else>
      <InsameeErrorGlobal :error="error" :to="{ name: 'index' }">
        Accueil
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
  data() {
    return {
      show: false,
    }
  },
}
</script>
