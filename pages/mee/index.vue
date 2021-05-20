<template>
  <AppContainer>
    <div class="flex flex-row justify-between items-center">
      <AppSelect
        v-model="itemPerPage"
        :items="itemsPerPage"
        name="itemsPerPage"
      />
      <AppButton large @click="filterDialog = true">Filtrer</AppButton>
      <!-- TODO: il faut mettre la modale dans le template -->
      <AppModal v-model="filterDialog">
        <div class="bg-grey-light rounded p-4">
          <div class="flex flex-row justify-between mb-2">
            <div class="text-xl font-bold">Filtres</div>
            <button @click="filterDialog = false">
              <IconDismiss
                class="h-8 w-8 fill-current text-primary-dark cursor-pointer"
              />
            </button>
          </div>
          <div class="mb-4">
            <FiltersUsers />
          </div>
          <div class="flex flex-row justify-end">
            <AppButton @click="fetch">Valider</AppButton>
          </div>
        </div>
      </AppModal>
    </div>
    <div v-if="$fetchState.pending">loading...</div>
    <div v-else-if="$fetchState.error">
      <pre>{{ $fetchState.error }}</pre>
    </div>
    <div v-else>
      <!-- <div v-for="user in data.data" :key="user.id">
        <ImageShow
          v-if="user.associations.length"
          :uuid="user.associations[0].image_id"
        />
      </div> -->
      <!-- <pre>{{ data.data }}</pre> -->
      <PaginateData :meta="data.meta" @change="$fetch" />
      <!-- TODO: faire un skeleton avec l'animation tailwind -->
      <UserCard v-for="user in data.data" :key="user.id" :user="user" />
    </div>
  </AppContainer>
</template>

<script>
export default {
  middleware: 'authenticated',
  data() {
    return {
      data: {},
      filterDialog: false,
      itemsPerPage: [
        { name: '5', id: 5 },
        { name: '10', id: 10 },
        { name: '20', id: 20 },
      ],
    }
  },
  fetchOnServer: false,
  async fetch() {
    const path = '/api/v1/users'
    const params = this.$store.getters['filters/getUsersSearchParams']
    const response = await this.$axios.get(`${path}?${params}`, {
      withCredentials: true,
    })

    this.data = response.data
  },
  computed: {
    itemPerPage: {
      get() {
        return this.$store.state.filters.users.limit
      },
      set(value) {
        this.$store.commit('filters/setUsersFilter', {
          name: 'limit',
          value,
        })
        this.$fetch()
        const query = this.$store.getters['filters/getUsersSearchParams']
        this.$router.push({
          path: `/mee?${query}`,
        })
      },
    },
  },
  methods: {
    fetch() {
      this.$fetch()
      this.filterDialog = false
    },
  },
}
</script>
