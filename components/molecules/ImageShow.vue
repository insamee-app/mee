<template>
  <component
    :is="name ? 'img' : 'div'"
    :src="ImageUrl"
    :alt="name ? alt : undefined"
    :class="name ? '' : 'bg-primary-dark w-full h-full'"
  />
</template>

<script>
export default {
  name: 'ImageShow',
  props: {
    name: {
      type: String,
      default: undefined,
    },
    alt: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    ImageUrl() {
      // TODO: use a env for s3 url and dev url (use ?? in config file)
      if (!this.name) return undefined
      return this.$config.axios.browserBaseURL + `/api/v1/uploads/${this.name}`
    },
  },
}
</script>
