<template>
  <InsameeAppCard justify>
    <template #header>
      <InsameeAppCardHeader closable @close="$emit('close')">
        <InsameeAppCardTitle> Information</InsameeAppCardTitle>
      </InsameeAppCardHeader>
    </template>
    <div>
      Un courriel vous a été envoyé afin de vous permettre de modifier votre mot
      de passe.
    </div>
  </InsameeAppCard>
</template>

<script>
export default {
  name: 'ResetPasswordCard',
}
</script>
