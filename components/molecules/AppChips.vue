<template>
  <ul class="flex flex-row w-full overflow-x-auto pb-1">
    <AppChip v-for="text in texts" :key="text">{{ text }}</AppChip>
  </ul>
</template>

<script>
export default {
  name: 'AppChips',
  props: {
    texts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
ul li + li {
  @apply ml-2;
}
</style>
