<template>
  <InsameeAppContainer small class="mx-auto">
    <div class="text-center text-2xl">
      <h1>Merci d'avoir créé un compte</h1>
    </div>
    <InsameeAppFrame class="mt-8">
      <p>Un email vous a été envoyé pour confirmer votre compte.</p>
      <p class="mt-4">
        Vous n'avez pas reçu le couriel ? <br />
        <InsameeAppButton
          empty
          inline
          :to="{ name: 'send-verify-email' }"
          class="text-primary-base"
          >Renvoyer</InsameeAppButton
        >
      </p>
    </InsameeAppFrame>
  </InsameeAppContainer>
</template>

<script>
export default {
  layout: 'minimal',
}
</script>
