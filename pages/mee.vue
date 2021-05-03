<template>
  <section class="pt-16 px-4">
    <AppCard v-for="value in 3" :key="value" class="w-full">
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
          <AppCardAssociation />
          <AppCardAssociation />
          <AppCardAssociation />
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
