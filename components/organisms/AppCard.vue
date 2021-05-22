<template>
  <component
    :is="to ? 'NuxtLink' : 'div'"
    class="flex flex-col py-2 bg-white rounded"
    :to="to"
  >
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
  },
}
</script>
