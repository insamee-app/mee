<template>
  <!-- TODO: si c'est un href, alors c'est un a, si c'est un to, alors un nuxtlink, sinon, un button -->
  <component
    :is="getComponentType"
    :disabled="disabled"
    class="rounded"
    :class="classButton"
    :to="to"
    :href="href"
    @click="to ? '' : $emit('click', $event)"
    ><slot></slot>
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
    href: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
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

      if (this.disabled) classNames.push('bg-grey-base')

      return classNames.join(' ')
    },
    getComponentType() {
      if (this.to) return 'NuxtLink'
      if (this.href) return 'a'

      return 'button'
    },
  },
}
</script>
