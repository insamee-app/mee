<template>
  <AppContainer
    ><AppProfil />
    <div class="my-4 flex flex-row justify-end sticky bottom-4">
      <AppButton large @click="dialog = true">Contacter</AppButton>
    </div>
    <AppModal v-model="dialog">
      <div class="bg-grey-light rounded p-4">
        <div class="flex flex-row justify-between mb-2">
          <div class="text-xl font-bold">lorem ipsum</div>
          <div @click="dialog = false">
            <IconDismiss
              class="h-8 w-8 fill-current text-primary-dark cursor-pointer"
            />
          </div>
        </div>
        <AppItemLabeled class="mb-4">
          <template #label>Téléphone</template>
          lorem ipsum (component for url)
        </AppItemLabeled>
        <AppItemLabeled class="mb-4">
          <template #label>Facebook Messenger</template>
        </AppItemLabeled>
        <AppItemLabeled class="mb-4">
          <template #label>Instagram</template>
        </AppItemLabeled>
      </div>
    </AppModal>
  </AppContainer>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
