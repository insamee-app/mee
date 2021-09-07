<template>
  <InsameeAppCard border reduced>
    <InsameeAppCardHeader :closable="closable" @close="$emit('close', $event)">
      <InsameeAppCardTitle>Filtres</InsameeAppCardTitle>
    </InsameeAppCardHeader>
    <Filters @submit="$emit('submit', $event)" />
  </InsameeAppCard>
</template>

<script>
export default {
  name: 'FiltersCard',
  props: {
    closable: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
