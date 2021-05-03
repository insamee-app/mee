<template>
  <div class="flex flex-row">
    <div class="w-8 h-8 bg-grey-light" :class="hasText ? 'mr-2' : 'ml-2'"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppCardAssociation',
  computed: {
    hasText() {
      return !!this.$slots.default
    },
  },
}
</script>
