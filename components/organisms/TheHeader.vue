<template>
  <header
    class="flex flex-row justify-between align-middle p-4 absolute w-full z-10"
  >
    <div class="flex flex-row">
      <Insamee class="h-8 w-8 mr-2" />
      <div class="self-center">INSAMEE</div>
    </div>
    <div class="flex flex-row">
      <AppButton border class="mr-8" :to="{ name: 'signin' }"
        >S'incrire</AppButton
      >
      <div @click="open">
        <IconLineHorizontal
          class="w-8 h-8 text-primary-base fill-current cursor-pointer"
        />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  methods: {
    open() {
      this.$emit('open', true)
    },
  },
}
</script>
