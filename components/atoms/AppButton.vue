<template>
  <!-- TODO: si c'est un href, alors c'est un a, si c'est un to, alors un nuxtlink, sinon, un button -->
  <component
    :is="getComponentType"
    :disabled="disabled || loading"
    class="rounded flex justify-center focus:outline-none"
    :class="classButton"
    :to="to"
    :href="href"
    @click="to ? '' : $emit('click', $event)"
  >
    <IconSpinner
      v-if="loading"
      class="animate-spin h-6 w-6 fill-current"
      :class="classSpinner"
    />
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
    href: {
      type: String,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
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
        classNames.push('border border-primary-dark text-primary-base bg-white')
      else classNames.push('bg-primary-base text-white')

      if (this.disabled || this.loading)
        classNames.push('bg-grey-base cursor-not-allowed')

      if (this.to) classNames.push('block text-center cursor-pointer')

      return classNames.join(' ')
    },
    classSpinner() {
      const classNames = []

      if (this.border) classNames.push('')
      else classNames.push('text-white')

      if (this.$slots.default) classNames.push('mr-2')

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
