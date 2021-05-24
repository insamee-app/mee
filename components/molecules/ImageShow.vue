<template>
  <component :is="name ? 'img' : 'div'" :src="ImageUrl" />
</template>

<script>
export default {
  name: 'ImageShow',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    ImageUrl() {
      // TODO: use a env for s3 url and dev url (use ?? in config file)
      return this.$config.axios.browserBaseURL + `/api/v1/uploads/${this.name}`
    },
  },
}
</script>
