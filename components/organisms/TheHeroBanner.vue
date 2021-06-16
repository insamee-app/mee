<template>
  <HomeContainer>
    <h1 class="font-bold text-4xl md:text-5xl lg:text-6xl px-4">
      Chercher, Trouver, Partager !
    </h1>
    <div class="flex flex-col mt-4 md:flex-row md:mt-16">
      <div
        class="
          text-grey-dark text-lg
          md:text-2xl
          lg:text-4xl
          px-4
          md:max-w-sm
          lg:max-w-lg
        "
      >
        Parce qu'être étudiant, c'est rencontrer et découvrir de nouvelles
        personnes
      </div>
      <GraphicHeroBanner
        class="
          flex-1
          mt-8
          ml-8
          w-[130%]
          h-auto
          md:m-0
          md:w-[300%]
          lg:w-3/4
          md:transform
          md:translate-x-16
          lg:transform-none
        "
      />
    </div>
    <div
      class="absolute bottom-8 w-full flex justify-center animate-bounce-slow"
    >
      <IconArrow class="md:h-8 md:w-8 lg:h-12 lg:w-12" />
    </div>
  </HomeContainer>
</template>

<script>
export default {
  name: 'TheHeroBanner',
}
</script>
