<template>
  <component
    :is="to ? 'NuxtLink' : 'button'"
    class="rounded"
    :class="classButton"
    :to="to"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    classButton() {
      const classNames = []

      if (this.large) classNames.push('p-2')
      else classNames.push('py-1 px-2')

      if (this.border)
        classNames.push('border border-primary-dark text-primary-base')
      else classNames.push('bg-primary-base text-white')

      return classNames.join(' ')
    },
  },
}
</script>
