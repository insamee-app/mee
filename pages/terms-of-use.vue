<template>
  <InsameeAppContainer>
    <NuxtContent
      :document="content"
      class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto"
    />
  </InsameeAppContainer>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const content = await $content('terms-of-use').fetch()

    return {
      content,
    }
  },
  head() {
    return {
      title: "Conditions Générales d'Utiliation",
    }
  },
}
</script>
