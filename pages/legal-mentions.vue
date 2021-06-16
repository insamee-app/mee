<template>
  <AppContainer class="mb-4">
    <NuxtContent
      :document="content"
      class="
        prose prose-sm
        sm:prose
        lg:prose-lg
        xl:prose-xl
        mx-auto
        text-justify
      "
    />
  </AppContainer>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const content = await $content('legal-mentions').fetch()

    return {
      content,
    }
  },
}
</script>
