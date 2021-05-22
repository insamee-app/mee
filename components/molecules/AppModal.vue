<template>
  <div
    v-if="value"
    class="fixed top-0 left-0 right-0 bottom-0 z-30 flex flex-col justify-center"
  >
    <div
      class="absolute bg-grey-light opacity-30 w-full h-full"
      @click="clickOutside"
    ></div>
    <div class="relative overflow-y-auto">
      <div class="flex flex-col justify-center p-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    clickOutside() {
      this.$emit('input', false)
    },
  },
}
</script>
