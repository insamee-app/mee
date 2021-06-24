<template>
  <div>
    <InsameeHeroBanner>
      <template #title>
        <InsameeHeroBannerTitle>
          Chercher, Trouver, Partager !
        </InsameeHeroBannerTitle>
      </template>
      <template #subtitle>
        <InsameeHeroBannerSubtitle>
          Parce qu'être étudiant, c'est rencontrer et découvrir de nouvelles
          personnes
        </InsameeHeroBannerSubtitle>
      </template>
      <template #graphic>
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
      </template>
    </InsameeHeroBanner>
    <InsameeFullContainer v-slot="{ graphicStyle }" around>
      <GraphicFans :class="graphicStyle" />
      <div>
        <InsameeFullContainerTitle>
          Une passion pour le sport ou l'esport à partager ?
        </InsameeFullContainerTitle>
        <InsameeFullContainerText class="w-8/12 mt-8">
          <span class="text-primary-base">INSAMEE</span> te permet de trouver
          des personnes avec qui tu vas pouvoir vibrer devant les meilleurs
          match !
        </InsameeFullContainerText>
      </div>
    </InsameeFullContainer>
    <InsameeAppHr />
    <InsameeFullContainer v-slot="{ graphicStyle }" around>
      <div>
        <InsameeFullContainerTitle>
          Tu veux faire une partie de foot mais tu ne sais pas avec qui y aller
          ?
        </InsameeFullContainerTitle>
        <InsameeFullContainerText class="mt-8">
          Avec <span class="text-primary-base">INSAMEE</span>, trouve des
          équipiers parmis les étudiants et formez votre propre équipe !
        </InsameeFullContainerText>
      </div>
      <GraphicFoot :class="graphicStyle" />
    </InsameeFullContainer>
    <InsameeAppHr />
    <InsameeFullContainer v-slot="{ graphicStyle }" around>
      <InsameeFullContainerTitle>
        Tu as un projet formidable en tête mais tu n'a pas toutes les
        compétences pour le faire ?
      </InsameeFullContainerTitle>
      <GraphicTeam :class="graphicStyle" />
      <InsameeFullContainerText class="mt-8">
        <span class="text-primary-base">INSAMEE</span> te permet de trouver les
        collaboratuer dont tu as toujours eu besoin pour maner à bien les
        projets les plus fous !
      </InsameeFullContainerText>
    </InsameeFullContainer>
    <InsameeAppHr />
    <InsameeFullContainer v-slot="{ graphicStyle }" around>
      <div>
        <InsameeFullContainerTitle>
          Une idée d'entreprise ou d'association ? Besoin de personnes
          talentueuses pour monter ton business ?
        </InsameeFullContainerTitle>
        <div class="flex justify-end mt-8">
          <InsameeFullContainerText class="text-right w-8/12">
            Avec <span class="text-primary-base">INSAMEE</span>, trouve tes
            futures associés et crée l'organisation dont tu as toujours rêvé !
          </InsameeFullContainerText>
        </div>
      </div>
      <GraphicBusiness :class="graphicStyle" />
    </InsameeFullContainer>
  </div>
</template>
