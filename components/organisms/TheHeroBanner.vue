<template>
  <HomeContainer>
    <div class="px-4 mb-8">
      <h1 class="font-bold text-4xl mb-4">Chercher, Trouver, Partager !</h1>
      <div class="text-grey-dark text-lg">
        Parce qu'être étudiant, c'est rencontrer et découvrir de nouvelles
        personnes
      </div>
    </div>
    <GraphicHeroBanner class="ml-8" />
    <div
      class="absolute bottom-8 w-full flex justify-center animate-bounce-slow"
    >
      <IconArrow />
    </div>
  </HomeContainer>
</template>

<script>
export default {
  name: 'TheHeroBanner',
}
</script>
