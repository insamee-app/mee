<template>
  <InsameeAppImg :base-url="baseUrl" :name="name" :alt="alt" />
</template>

<script>
export default {
  name: 'ImgFetch',
  props: {
    name: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      baseUrl: this.$config.axios.browserBaseURL + '/api/v1/uploads/',
    }
  },
}
</script>
