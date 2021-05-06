<template>
  <div class="flex flex-col">
    <label :for="name" class="mb-1"><slot></slot></label>
    <select
      :id="name"
      :name="name"
      class="py-1 px-2 border border-primary-dark rounded bg-grey-light"
    >
      <option
        v-for="item in selectItems"
        :key="item.id"
        :value="item.id"
        class="hover:bg-primary-dark"
      >
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    name: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    selectItems() {
      const item = { id: '', name: 'Veuillez choisir une valeur' }
      const items = this.items.slice()
      items.unshift(item)
      return items
    },
  },
}
</script>
