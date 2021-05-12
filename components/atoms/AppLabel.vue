<template>
  <label :for="name">{{ text }}</label>
</template>

<script>
export default {
  name: 'AppLabel',
  props: {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>
