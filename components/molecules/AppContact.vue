<template>
  <ul class="grid grid-cols-2 gap-2">
    <li v-for="value in keys" :key="value" class="text-center">
      <component
        :is="links[value] ? 'a' : 'div'"
        :href="href(value)"
        :target="links[value] ? '_blank' : undefined"
        :rel="links[value] ? 'noopener noreferrer' : undefined"
        class="hover:text-primary-dark text-xl capitalize"
        :class="links[value] ? 'text-primary-base' : ''"
        >{{ links[value] ? value : `${value}: non renseigné` }}</component
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
      // TODO: Use a regex to detect phone
      return value === 'téléphone'
        ? 'tel:' + this.links[value]
        : this.links[value]
    },
  },
}
</script>
