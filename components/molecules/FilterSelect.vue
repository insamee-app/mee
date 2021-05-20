<template>
  <div class="flex flex-col items-center">
    <IconSpinner
      v-if="$fetchState.pending"
      class="animate-spin text-primary-dark fill-current h-6 w-6 my-4"
    ></IconSpinner>
    <AppSelect
      v-else
      v-model="selected"
      class="w-full"
      :name="name"
      :items="fetchedData"
      :label="label"
      choose-text
    >
      <template #option="{ item }">
        <slot name="option" :item="item"></slot>
      </template>
    </AppSelect>
  </div>
</template>

<script>
import fetchData from '~/mixins/fetchData'

export default {
  name: 'FilterSelect',
  mixins: [fetchData],
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    ressource: {
      type: String,
      required: true,
    },
  },
  computed: {
    selected: {
      get() {
        const value = this.$store.state.filters.users[this.name]
        return value === undefined ? '' : value
      },
      set(value) {
        const newValue = value === '' ? undefined : value
        this.$emit('selected', this.name, newValue)
      },
    },
  },
}
</script>
