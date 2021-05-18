<template>
  <div class="relative flex flex-row items-center">
    <input
      :id="name"
      type="checkbox"
      :name="name"
      class="w-4 h-4 absolute opacity-0"
      @change="$emit('input', $event.target.checked)"
    />
    <div
      class="w-4 h-4 rounded border border-primary-dark flex flex-col justify-center items-center"
      :class="classCheckBox"
    >
      <IconCheck v-if="value" class="w-3 h-3 text-white fill-current" />
    </div>
    <label :for="name" class="ml-2 text-sm"><slot></slot></label>
  </div>
</template>

<script>
export default {
  name: 'AppCheck',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    classCheckBox() {
      const classNames = []

      if (this.value) classNames.push('bg-primary-dark')

      return classNames.join(' ')
    },
  },
}
</script>
