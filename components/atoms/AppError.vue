<template>
  <ul v-if="errors.length" class="text-sm text-primary-dark text-center">
    <template v-if="full">
      <li v-for="error in errors" :key="error.message">{{ error.message }}</li>
    </template>
    <li v-else>{{ errors[0].message }}</li>
  </ul>
</template>

<script>
export default {
  name: 'AppError',
  props: {
    errors: {
      type: Array,
      required: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
