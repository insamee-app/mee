<template>
  <div>
    <div class="mb-1 flex row justify-between">
      <label :for="name"><slot name="label"></slot></label>
      <span v-if="$slots.addon" :for="name" class="text-primary-base"
        ><slot name="addon"></slot
      ></span>
    </div>
    <input
      :id="name"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :value="value"
      class="border border-primary-dark rounded py-1 px-2 w-full placeholder-grey-base focus: outline-none"
      @input="$emit('input', $event.target.value)"
    />
    <div v-if="errorMessage" class="text-primary-dark text-xs">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
}
</script>
