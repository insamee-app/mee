<template>
  <AppContainer>
    <template v-if="user">
      <UserProfile :user="user" />
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
    const path = '/api/v1/users'
    const { id } = params
    let user
    try {
      const response = await $axios.get(`${path}/${id}`, {
        withCredentials: true,
      })
      user = response.data
    } catch (error) {
      console.error(error)
    }
    return {
      user,
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
        facebook: this.user.url_facebook,
        instagram: this.user.url_instagram,
        twitter: this.user.url_twitter,
        téléphone: this.user.mobile,
      }
    },
  },
}
</script>
