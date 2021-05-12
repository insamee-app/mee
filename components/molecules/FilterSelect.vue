<template>
  <div>
    <span v-if="$fetchState.pending">loading</span>
    <AppSelect
      v-else
      v-model="selected"
      :name="name"
      :items="data"
      :label="label"
    >
      <template #option="{ item }">
        <slot name="option" :item="item"></slot>
      </template>
    </AppSelect>
  </div>
</template>

<script>
export default {
  name: 'FilterSelect',
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
  data() {
    return {
      data: undefined,
    }
  },
  async fetch() {
    // TODO: il n'y a pas besoin du try (because fetch le gère)
    try {
      const { data } = await this.$axios.get(`/api/v1/${this.ressource}`, {
        withCredentials: true,
      })
      this.data = data
    } catch (error) {
      console.error(error)
    }
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
