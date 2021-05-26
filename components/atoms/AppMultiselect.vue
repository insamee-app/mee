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
// On va le reconstruire pour n'avoir que ce dont on a besoin (en terme de css)
</script>

<style>
.multiselect,
.multiselect__input,
.multiselect__single {
  touch-action: manipulation;
  @apply text-base;
}

.multiselect {
  @apply w-full relative;
}

.multiselect__select {
  @apply absolute block m-0 cursor-pointer text-center origin-center transition-transform py-1 px-2 right-0 w-6 h-6 transform -translate-y-1/2 top-1/2 flex items-center;
}

.multiselect__select:before {
  @apply relative right-0 border-4 border-b-0 border-primary-dark;
  content: '';
  border-left-color: transparent;
  border-right-color: transparent;
}

.multiselect--above.multiselect--active .multiselect__tags {
  @apply rounded-t-none;
}

.multiselect--active:not(.multiselect--above) .multiselect__tags {
  @apply rounded-b-none;
}

.multiselect--active .multiselect__select {
  @apply rotate-180 origin-center;
}

.multiselect__placeholder {
  @apply text-grey-base;
}

.multiselect__input {
  @apply inline-block text-sm text-black focus:outline-none;
}

.multiselect__tags {
  @apply rounded border border-primary-dark text-sm text-white px-2 py-1;
}

.multiselect__tag {
  @apply inline-block bg-primary-dark rounded py-1 px-2;
}

.multiselect__tag + .multiselect__tag {
  @apply ml-2;
}

.multiselect__tag-icon {
  @apply cursor-pointer ml-1 not-italic rounded;
}

.multiselect__tag-icon::after {
  content: 'X';
  @apply px-2;
}

.multiselect__tag-icon:hover {
  @apply bg-primary-base;
}

.multiselect__tag-icon:after {
  @apply text-white;
}

.multiselect__content-wrapper {
  @apply absolute block left-0 right-0 border border-primary-dark bg-white z-50;
}

.multiselect__content::webkit-scrollbar {
  display: none;
}

.multiselect__content {
  @apply w-full px-2 py-1;
}

.multiselect__content-wrapper {
  @apply border border-primary-dark border-t-0 rounded-t-none rounded-b;
}

.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  @apply border border-primary-dark border-b-0 rounded-b-none rounded-t;
}

.multiselect__element {
  @apply block;
}

.multiselect__element + .multiselect__element {
  @apply mt-2;
}

.multiselect__option {
  @apply block py-1 px-2 text-primary-dark rounded;
}

.multiselect__option--highlight,
.multiselect__option--highlight:after {
  @apply bg-grey-base;
}

.multiselect__option--selected {
  @apply bg-grey-light;
}

.multiselect__option--selected.multiselect__option--highlight,
.multiselect__option--selected.multiselect__option--highlight:after {
  @apply bg-grey-base;
}

.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}
.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}
</style>
