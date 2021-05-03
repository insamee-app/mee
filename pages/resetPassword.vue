<template>
  <section>
    <AppInput
      type="password"
      name="password"
      placeholder="*******"
      class="w-full mb-2"
    >
      <template #label> Mot de passe </template>
    </AppInput>
    <AppInput
      type="password"
      name="password_confirmation"
      placeholder="*******"
      class="w-full mb-8"
    >
      <template #label> Confirmer le mot de passe </template>
    </AppInput>
    <AppButton large class="w-full">Modifier son mot de passe</AppButton>
  </section>
</template>

<script>
export default {
  layout: 'minimal',
}
</script>
