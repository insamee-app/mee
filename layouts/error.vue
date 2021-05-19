<template>
  <section class="text-center">
    <template v-if="error.statusCode === 404">
      <h1 class="text-primary-dark font-bold text-4xl">404</h1>
      <div class="mt-8">Il n'y a pas de Mee par ici !</div>
      <NuxtLink :to="{ name: 'login' }" class="text-primary-dark mt-4 block"
        >Trouver de nouveaux Mee ?</NuxtLink
      >
    </template>
    <template v-else>
      <h1>Il semble qu'une erreur soit survenue !</h1>
      <AppButton large class="w-full mt-8" :to="{ name: 'index' }"
        >Accueil</AppButton
      >
      <AppButton border class="w-full mt-8" @click="show = !show"
        >En savoir plus</AppButton
      >
      <pre v-if="show" class="mt-8 overflow-x-auto text-left">{{ error }}</pre>
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
