<template>
  <AppContainer>
    <div class="flex flex-row mb-8">
      <div class="w-32 h-32 rounded-full bg-primary-dark mr-8"></div>
      <div class="flex flex-col justify-between">
        <AppItemLabeled>
          <template #label>NOM</template>
          Jackson
        </AppItemLabeled>
        <AppItemLabeled>
          <template #label>Prénom</template>
          Dereck
        </AppItemLabeled>
      </div>
    </div>
    <AppItemLabeled class="mb-4">
      <template #label>Adresse électronique</template>
      derekcjackson@dayrep.com
    </AppItemLabeled>
    <div class="flex flex-row mb-4">
      <AppItemLabeled class="flex-1">
        <template #label>Ecole</template>
        Williams Bros.
      </AppItemLabeled>
      <AppItemLabeled class="flex-1">
        <template #label>Année de diplomation</template>
        2023
      </AppItemLabeled>
    </div>
    <AppItemLabeled class="mb-4">
      <template #label>Centres d'interêt</template>
      <AppChips />
    </AppItemLabeled>
    <AppItemLabeled class="mb-4">
      <template #label>Compétences</template>
      <AppChips />
    </AppItemLabeled>
    <AppItemLabeled class="mb-4">
      <template #label>Associations</template>
      <AppAssociation class="mb-2"> lorem ipsum </AppAssociation>
      <AppAssociation class="mb-2"> lorem ipsum </AppAssociation>
      <AppAssociation> lorem ipsum </AppAssociation>
    </AppItemLabeled>
    <AppItemLabeled class="mb-4 text-justify">
      <template #label>Description</template>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum ullam
      tempore aut aliquam accusantium quod quam cupiditate nam obcaecati ipsam,
      eos, quisquam fugiat error sed iste, nostrum sequi rem cumque? Nesciunt,
      impedit? Praesentium, beatae eum facere eveniet libero similique neque
      iusto distinctio quibusdam. Ratione, doloremque officia. Libero aliquam id
      accusamus nemo vero quibusdam animi ullam repellat. Molestias ratione
      eligendi minima. Nesciunt impedit expedita et dolorum vitae corporis natus
      cum consequatur esse atque ipsam saepe nemo eius tenetur blanditiis vero
      fugiat quisquam, beatae qui voluptatum adipisci. Possimus blanditiis
      reiciendis aut id. Labore repellat atque error tempore deleniti vitae
      perferendis quaerat, qui aspernatur repellendus assumenda recusandae
      voluptas perspiciatis cum dolores autem amet sed, sit, vero nemo aperiam
      quisquam cupiditate dolor? Distinctio, aut?
    </AppItemLabeled>
  </AppContainer>
</template>
