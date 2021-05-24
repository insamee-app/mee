<template>
  <multiselect
    v-bind="$attrs"
    placeholder="Choisir une option"
    select-label=""
    selected-label=""
    deselect-label=""
    v-on="$listeners"
  />
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'AppMultiselect',
  components: { Multiselect },
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.multiselect {
  @apply rounded border border-primary-dark;
}

.multiselect__tag {
  @apply bg-primary-dark rounded;
}

.multiselect__tag-icon:hover {
  @apply bg-primary-base;
}

.multiselect__tag-icon:after {
  @apply text-white;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  @apply bg-primary-base;
}

.multiselect__option--selected {
  @apply text-black;
}

.multiselect__option--selected.multiselect__option--highlight,
.multiselect__option--selected.multiselect__option--highlight:after {
  @apply bg-primary-base;
}
</style>
