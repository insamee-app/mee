<template>
  <component
    :is="to ? 'NuxtLink' : 'div'"
    class="flex flex-col p-4 bg-white rounded-lg"
    :to="to"
  >
    <button
      v-if="closable"
      class="absolute right-8 top-8"
      @click="$emit('close')"
    >
      <IconDismiss class="text-primary-dark fill-current w-6 h-6" />
    </button>
    <div
      v-if="$slots.title || $slots.associations || $slots.avatar"
      class="flex flex-row px-2 pt-2"
    >
      <slot name="avatar"></slot>
      <div
        v-if="$slots.title || $slots.associations"
        class="flex flex-col flex-1"
      >
        <slot name="title"></slot>
        <slot name="associations"></slot>
      </div>
    </div>
    <slot></slot>
    <slot name="chips"></slot>
    <slot name="text"></slot>
  </component>
</template>

<script>
export default {
  name: 'AppCard',
  props: {
    to: {
      type: Object,
      default: undefined,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
