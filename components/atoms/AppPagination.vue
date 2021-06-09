<template>
  <button
    class="rounded border border-primary-dark p-2 font-bold"
    :class="className"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      const classNames = []

      if (this.active) classNames.push('text-white bg-primary-dark')
      else classNames.push('text-primary-base')

      return classNames.join(' ')
    },
  },
}
</script>
