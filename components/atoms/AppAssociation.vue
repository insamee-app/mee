<template>
  <div class="flex flex-row space-x-2">
    <InsameeAppImg class="w-8 h-8" :link="link" :alt="name"></InsameeAppImg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppAssociation',
  props: {
    link: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: undefined,
    },
  },
}
</script>
