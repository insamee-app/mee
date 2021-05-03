<template>
  <component
    :is="to ? 'NuxtLink' : 'div'"
    class="flex flex-col py-2 bg-white rounded my-8"
    :to="to"
  >
    <div class="flex flex-row px-2 pt-2">
      <slot name="avatar"></slot>
      <div class="flex flex-col flex-1">
        <slot name="title"></slot>
        <slot name="associations"></slot>
      </div>
    </div>
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
