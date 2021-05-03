<template>
  <section>
    <AppInput
      type="email"
      name="email"
      placeholder="exemple@insamee.fr"
      class="w-full mb-2"
    >
      <template #label> Adresse électronique </template>
    </AppInput>
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
      <template #label> Vérification du mot de passe </template>
    </AppInput>
    <AppButton large class="w-full mb-8">S'inscrire</AppButton>
    <AppFrame class="w-full mb-8">
      <span
        >Déjà un comptes ?
        <NuxtLink class="text-primary-base" :to="{ name: 'login' }"
          >Se connecter</NuxtLink
        ></span
      >
    </AppFrame>
  </section>
</template>

<script>
export default {
  layout: 'minimal',
}
</script>
