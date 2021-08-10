<template>
  <div>
    <div v-if="error">Une erreur est survenue</div>
    <InsameeIconSpinner
      v-else-if="!items.length"
      class="animate-spin fill-current mx-auto"
      :class="classSpinner"
    />
    <InsameeComboboxMultiple
      v-else
      :variant="variant"
      :items="items"
      :placeholder="placeholder"
      :value="value"
      @selected="$emit('selected', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'ComboboxMultiple',
  props: {
    value: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      default: 'primary',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      error: undefined,
    }
  },
  computed: {
    items() {
      return this.$store.getters[`data/${this.name}`]
    },
    classSpinner() {
      const classNames = []

      if (this.isPrimary) classNames.push('text-primary-base')
      else if (this.isSecondary) classNames.push('text-secondary-base')

      return classNames.join(' ')
    },
  },
  async created() {
    try {
      await this.$store.dispatch('data/fetch', this.name)
      this.$emit('update', this.name)
    } catch (error) {
      this.error = error
    }
  },
}
</script>
