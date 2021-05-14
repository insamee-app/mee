<template>
  <div class="flex flex-row justify-end">
    <AppAssociation
      v-for="association in associations"
      :key="association.id"
      :uuid="association.image_id"
    />
  </div>
</template>

<script>
export default {
  name: 'AppCardAssociations',
  props: {
    associations: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
