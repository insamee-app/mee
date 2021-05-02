<template>
  <header
    class="flex flex-row justify-between align-middle p-4 absolute w-full"
  >
    <div class="flex flex-row">
      <Insamee class="h-8 w-8 mr-2" />
      <div class="self-center">INSAMEE</div>
    </div>
    <div class="flex flex-row">
      <AppButton border class="mr-8" :to="{ name: 'signin' }"
        >S'incrire</AppButton
      >
      <IconLineHorizontal
        class="w-8 h-8 text-primary-base fill-current cursor-pointer"
      />
    </div>
  </header>
</template>
