<template>
  <div class="flex flex-col items-center">
    <InsameeIconSpinner
      v-if="$fetchState.pending"
      class="animate-spin text-primary-dark fill-current h-6 w-6 my-4"
    ></InsameeIconSpinner>
    <AppMultiselect
      v-else
      :value="value"
      track-by="id"
      :custom-label="format"
      :options="fetchedData"
      multiple
      searchable
      :close-on-select="false"
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
import fetchData from '~/mixins/fetchData'

export default {
  name: 'ProfileSelect',
  mixins: [fetchData],
  props: {
    value: {
      type: Array,
      required: true,
    },
    ressource: {
      type: String,
      required: true,
    },
    format: {
      type: Function,
      default: ({ name }) => name.toUpperCase(),
    },
  },
}
</script>
