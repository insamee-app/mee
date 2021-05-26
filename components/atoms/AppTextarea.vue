<template>
  <div>
    <AppLabel :name="name"><slot></slot></AppLabel>
    <textarea
      :id="name"
      class="border border-primary-dark rounded p-2 w-full"
      :value="value"
      name="text"
      cols="30"
      rows="10"
      v-bind="$attrs"
      @input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'AppTextarea',
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
}
</script>
