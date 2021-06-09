<template>
  <InsameeAppCard :closable="closable" :to="to">
    <div class="space-y-4">
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
    </div>
  </InsameeAppCard>
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
