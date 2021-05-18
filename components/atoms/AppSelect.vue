<template>
  <div class="flex flex-col">
    <AppLabel v-if="label" :name="name" :text="label" />
    <select
      :id="name"
      :name="name"
      class="py-1 px-2 border border-primary-dark rounded bg-grey-light"
      @input="$emit('input', $event.target.value)"
    >
      <option
        v-for="item in selectItems"
        :key="item.id"
        :value="item.id"
        :selected="isSelected(item.id, value)"
        class="hover:bg-primary-dark"
      >
        <slot name="option" :item="item"> {{ item.name }}</slot>
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  props: {
    value: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: true,
    },
    chooseText: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectItems() {
      const items = this.items.slice()
      if (this.chooseText) {
        const item = { id: '', name: 'Veuillez choisir une valeur' }
        items.unshift(item)
      }
      return items
    },
  },
  methods: {
    isSelected(id, value) {
      return String(id) === String(value)
    },
  },
}
</script>
