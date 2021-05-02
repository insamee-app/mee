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
      class="w-full mb-8"
    >
      <template #label> Mot de passe </template>
      <template #addon> Oublié ? </template>
    </AppInput>
    <AppButton class="w-full mb-8">Se connecter</AppButton>
    <AppFrame class="w-full mb-8">
      <span
        >Pas encore de compte ?
        <NuxtLink class="text-primary-base" :to="{ name: 'signin' }"
          >S'inscire</NuxtLink
        ></span
      >
    </AppFrame>
    <div class="text-center leading-5">
      <div class="font-light">Besoin de vérifier votre compte ?</div>
      <AppNuxtLink :to="{ name: 'sendVerifiedEmail' }"
        >Renvoyer le couriel</AppNuxtLink
      >
    </div>
  </section>
</template>

<script>
export default {
  layout: 'minimal',
}
</script>
