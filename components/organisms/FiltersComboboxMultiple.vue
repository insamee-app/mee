<template>
  <div>
    <div v-if="error">Une erreur est survenue</div>
    <InsameeIconSpinner
      v-else-if="!items.length"
      class="animate-spin text-secondary-base fill-current mx-auto"
    />
    <InsameeComboboxMultiple
      v-else
      variant="secondary"
      :items="items"
      :placeholder="placeholder"
      :value="value"
      @selected="$emit('selected', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'FiltersComboboxMultiple',
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
