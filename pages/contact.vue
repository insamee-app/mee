<template>
  <InsameeContact :mail="mail">
    <GraphicMail class="w-full" />
  </InsameeContact>
</template>

<script>
export default {
  data() {
    return {
      mail: 'mailto:contact@insamee.fr',
    }
  },
  head() {
    return {
      title: 'Nous contacter',
    }
  },
}
</script>
