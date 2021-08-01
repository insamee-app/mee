<template>
  <main class="pt-16 w-full h-screen flex flex-col overflow-hidden relative">
    <div class="flex justify-center">
      <NuxtLink :to="{ name: 'index' }">
        <InsameeIconInsamee class="w-32 h-32 mx-auto" />
      </NuxtLink>
    </div>
    <Nuxt />
  </main>
</template>
