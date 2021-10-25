<template>
  <main class="pt-16 pb-4 w-full min-h-screen flex flex-col">
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
