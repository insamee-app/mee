<template>
  <main class="pt-16 w-screen h-screen flex flex-col overflow-hidden relative">
    <div class="flex justify-center mb-16">
      <NuxtLink :to="{ name: 'index' }">
        <NuxtImg
          src="/logos/mee.png"
          height="128"
          alt="logo de la plateforme mee"
          class="mx-auto"
        />
      </NuxtLink>
    </div>
    <Nuxt />
  </main>
</template>
