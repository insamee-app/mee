<template>
  <section>
    <AppInput
      type="email"
      name="email"
      placeholder="exemple@insamee.fr"
      class="w-full mb-8"
    >
      <template #label> Adresse électronique </template>
    </AppInput>
    <AppButton large class="w-full"
      >Envoyer le couriel de vérification</AppButton
    >
  </section>
</template>
