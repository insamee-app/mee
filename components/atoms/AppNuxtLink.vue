<template>
  <NuxtLink :to="to" class="text-primary-base font-light"
    ><slot></slot
  ></NuxtLink>
</template>

<script>
export default {
  name: 'AppNuxtLink',
  props: {
    to: {
      type: Object,
      required: true,
    },
  },
}
</script>
