<template>
  <AppContainer class="max-w-4xl mx-auto">
    <template v-if="profile">
      <UserProfile :profile="profile" class="mt-4" />
      <div class="my-4 flex flex-row justify-end sticky bottom-4">
        <InsameeAppButton large @click="dialog = true">
          Contacter
        </InsameeAppButton>
      </div>
      <InsameeAppModal :value="dialog" @outside="dialog = false">
        <InsameeAppCard closable @close="dialog = false">
          <template #header> Contacter </template>
          <AppContact :links="socials" />
        </InsameeAppCard>
      </InsameeAppModal>
    </template>
  </AppContainer>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({ params, $axios }) {
    const path = '/api/v1/profiles'
    const { id } = params
    let profile
    try {
      const response = await $axios.get(`${path}/${id}`, {
        withCredentials: true,
      })
      profile = response.data
    } catch (error) {
      console.error(error)
    }
    return {
      profile,
    }
  },
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    socials() {
      return {
        facebook: this.profile.url_facebook,
        instagram: this.profile.url_instagram,
        twitter: this.profile.url_twitter,
        téléphone: this.profile.mobile,
      }
    },
  },
}
</script>
