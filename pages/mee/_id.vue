<template>
  <AppContainer>
    <template v-if="user">
      <UserProfil :user="user" />
      <div class="my-4 flex flex-row justify-end sticky bottom-4">
        <AppButton large @click="dialog = true">Contacter</AppButton>
      </div>
      <AppModal v-model="dialog">
        <div class="bg-grey-light rounded p-4">
          <div class="flex flex-row justify-between mb-2">
            <div class="text-xl font-bold">Contacter X</div>
            <div @click="dialog = false">
              <IconDismiss
                class="h-8 w-8 fill-current text-primary-dark cursor-pointer"
              />
            </div>
          </div>
          <AppContact :links="socials" />
        </div>
      </AppModal>
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
      const data = {
        ...this.user.social_networks,
      }
      if (this.user.mobile) data.tel = this.user.mobile

      return data
    },
  },
}
</script>
