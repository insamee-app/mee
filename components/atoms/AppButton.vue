<template>
  <button class="bg-primary-base text-white rounded" :class="classButton">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    large: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classButton() {
      const classNames = []

      if (this.large) classNames.push('p-2')
      else classNames.push('py-1 px-2')

      return classNames.join(' ')
    },
  },
}
</script>
