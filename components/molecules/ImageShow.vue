<template>
  <img :src="ImageUrl" />
</template>
<script>
export default {
  name: 'ImageShow',
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
  computed: {
    ImageUrl() {
      return (
        this.$config.axios.browserBaseURL + `/api/v1/uploads/${this.uuid}.png`
      )
    },
  },
}
</script>
