<template>
  <ul class="flex flex-row w-full overflow-x-auto pb-1">
    <AppChip>lorem ipsum</AppChip>
    <AppChip>lorem ipsum</AppChip>
    <AppChip>lorem ipsum</AppChip>
    <AppChip>lorem ipsum</AppChip>
    <AppChip>lorem ipsum</AppChip>
    <AppChip>lorem ipsum</AppChip>
    <AppChip>lorem ipsum</AppChip>
    <AppChip>lorem ipsum</AppChip>
  </ul>
</template>

<script>
export default {
  name: 'AppChips',
}
</script>

<style scoped>
ul li + li {
  @apply ml-2;
}
</style>
