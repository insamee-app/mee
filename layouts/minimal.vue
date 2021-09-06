<template>
  <main class="pt-16 pb-4 w-full min-h-screen flex flex-col">
    <div class="flex justify-center">
      <NuxtLink :to="{ name: 'index' }">
        <InsameeIconInsamee class="w-32 h-32 mx-auto" />
      </NuxtLink>
    </div>
    <Nuxt />
  </main>
</template>
