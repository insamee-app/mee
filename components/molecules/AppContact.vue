<template>
  <ul>
    <li v-for="value in keys" :key="value" class="text-center">
      <a
        :href="href(value)"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-primary-dark text-primary-base text-xl capitalize"
        >{{ links[value] ? value : `${value}: non renseigné` }}</a
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
  methods: {
    href(value) {
      return value === 'tel' ? 'tel:' + this.links[value] : this.links[value]
    },
  },
}
</script>

<style scoped>
ul li + li {
  @apply mt-4;
}
</style>
