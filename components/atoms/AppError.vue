<template>
  <section v-if="errors.length" class="text-sm text-primary-dark text-center">
    {{ errors[0].message }}
  </section>
</template>

<script>
export default {
  name: 'AppError',
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
}
</script>
