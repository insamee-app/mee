<template>
  <AppContainer>
    <pre>{{ error }}</pre>
  </AppContainer>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
