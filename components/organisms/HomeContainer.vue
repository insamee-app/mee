<template>
  <section
    class="h-screen flex flex-col overflow-x-hidden relative"
    :class="around ? 'justify-around' : 'justify-center'"
  >
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'HomeContainer',
  props: {
    around: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
