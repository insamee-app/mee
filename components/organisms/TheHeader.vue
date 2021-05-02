<template>
  <header class="flex flex-row justify-between p-4 absolute w-full">
    <div class="flex flex-row"><Insamee class="h-6 w-6 mr-2" />INSAMEE</div>
    <div class="flex flex-row align-middle">
      <AppButton border class="mr-8" :to="{ name: 'signin' }"
        >S'incrire</AppButton
      >
      <IconLineHorizontal
        class="w-8 h-8 text-primary-base fill-current cursor-pointer"
      />
    </div>
  </header>
</template>
