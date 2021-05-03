<template>
  <div class="absolute top-0 bottom-0 right-0 bg-white w-10/12 z-20">
    <div class="flex justify-end pt-4 px-4 pb-6">
      <div @click="close">
        <IconDismiss class="text-primary-base h-8 w-8 fill-current" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavMobile',
  methods: {
    close() {
      this.$emit('close', false)
    },
  },
}
</script>
