<template>
  <section class="w-80 mx-auto">
    <div class="text-center text-2xl">
      <h1>Merci d'avoir créé un compte</h1>
    </div>
    <InsameeAppFrame class="mt-8">
      <p>Un email vous a été envoyé pour confirmer votre compte.</p>
    </InsameeAppFrame>
    <p class="mt-4 text-center">
      Vous n'avez pas reçu le couriel ? <br />
      <InsameeAppButton
        empty
        inline
        :to="{ name: 'send-verify-email' }"
        variant="secondary"
      >
        Renvoyer
      </InsameeAppButton>
    </p>
  </section>
</template>

<script>
export default {
  layout: 'minimal',
}
</script>
