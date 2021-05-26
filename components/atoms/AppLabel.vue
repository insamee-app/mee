<template>
  <label :for="name"><slot></slot></label>
</template>

<script>
export default {
  name: 'AppLabel',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
