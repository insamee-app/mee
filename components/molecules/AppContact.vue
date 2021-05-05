<template>
  <ul>
    <li v-for="value in keys" :key="value" class="text-center">
      <a
        :href="links[value]"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-primary-dark text-primary-base text-xl capitalize"
        >{{ value }}</a
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppContact',
  props: {
    links: {
      type: Object,
      required: true,
    },
  },
  computed: {
    keys() {
      return Object.keys(this.links)
    },
  },
}
</script>

<style scoped>
ul li + li {
  @apply mt-4;
}
</style>
