<template>
  <footer class="p-4 text-center text-grey-dark bg-grey-light">
    <div class="mb-6">
      <NuxtLink :to="{ name: 'legal-mentions' }">Mentions légales</NuxtLink>
    </div>
    <div>
      Réalisé avec
      <IconHeart class="text-primary-dark fill-current inline" /> par des
      étudiants pour les étudiants
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
}
</script>
