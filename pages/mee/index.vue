<template>
  <section class="pt-16 px-4">
    <div class="flex flex-row justify-end">
      <AppButton large @click="filterDialog = true">Filtrer</AppButton>
      <AppModal v-model="filterDialog">
        <div class="bg-grey-light rounded p-4">
          <div class="flex flex-row justify-between mb-2">
            <div class="text-xl font-bold">Filtres</div>
            <div @click="filterDialog = false">
              <IconDismiss
                class="h-8 w-8 fill-current text-primary-dark cursor-pointer"
              />
            </div>
          </div>
          <div class="mb-4">
            <AppSelect name="focusInterest" :items="focusInterestItems"
              >Centre d'interêt</AppSelect
            >
          </div>
          <div class="flex flex-row justify-end">
            <AppButton>Valider</AppButton>
          </div>
        </div>
      </AppModal>
    </div>
    <AppCard
      v-for="value in 3"
      :key="value"
      class="w-full"
      :to="{ name: 'mee-id', params: { id: value } }"
    >
      <template #avatar>
        <AppCardAvatar />
      </template>
      <template #title>
        <AppCardTitle>
          <span>lorem ipsum</span>
          <span>lorem ipsum</span>
        </AppCardTitle>
      </template>
      <template #associations>
        <AppCardAssociations>
          <AppAssociation />
          <AppAssociation />
          <AppAssociation />
        </AppCardAssociations>
      </template>
      <template #chips>
        <AppCardActions><AppChips /></AppCardActions>
      </template>
      <template #text>
        <AppCardText
          >Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          voluptatum porro, repellat autem aliquam eius mollitia itaque error
          repudiandae illo aut amet explicabo cumque laborum, praesentium quas
          nobis odio! Suscipit?</AppCardText
        >
      </template>
    </AppCard>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filterDialog: false,
      focusInterestItems: [
        {
          id: 1,
          name: 'talent',
        },
        {
          id: 1,
          name: 'talent',
        },
        {
          id: 1,
          name: 'talent',
        },
        {
          id: 1,
          name: 'talent',
        },
      ],
    }
  },
}
</script>
