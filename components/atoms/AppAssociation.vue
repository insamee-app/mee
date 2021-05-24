<template>
  <div class="flex flex-row">
    <ImageShow
      class="w-8 h-8"
      :class="hasText ? 'mr-2' : 'ml-2'"
      :name="uuid"
    ></ImageShow>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppCardAssociation',
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
  computed: {
    hasText() {
      return !!this.$slots.default
    },
  },
}
</script>
