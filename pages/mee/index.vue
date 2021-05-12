<template>
  <section class="pt-16 px-4">
    <div class="flex flex-row justify-end">
      <AppButton large @click="filterDialog = true">Filtrer</AppButton>
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
    <span v-if="$fetchState.pending">loading...</span>
    <span v-else-if="$fetchState.error">
      <pre>{{ $fetchState.error }}</pre>
    </span>
    <div v-else>
      <pre>{{ data.data }}</pre>
      <PaginateData :meta="data.meta" @change="$fetch" />
    </div>
    <!-- faire un dossier template pour mettre cette card -->
    <!-- <AppCard
      v-for="user in users"
      :key="user.id"
      class="w-full"
      :to="{ name: 'mee-id', params: { id: user.id } }"
    >
      <template #avatar>
        <AppCardAvatar />
      </template>
      <template #title>
        <AppCardTitle>
          <span>{{ user.first_name }}</span>
          <span>{{ user.last_name }}</span>
        </AppCardTitle>
      </template>
      <template #associations>
        <AppCardAssociations>
          <AppAssociation />
          <AppAssociation />
          <AppAssociation />
        </AppCardAssociations>
      </template>
      <template #chips>
        <AppCardActions v-if="user.skills.length"
          ><AppChips :texts="getSkills(user)"
        /></AppCardActions>
      </template>
      <template #text>
        <AppCardText>{{ user.text }}</AppCardText>
      </template>
    </AppCard> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      filterDialog: false,
    }
  },
  async fetch() {
    const path = '/api/v1/users'
    const params = this.$store.getters['filters/getUsersSearchParams']
    const response = await this.$axios.get(`${path}?${params}`, {
      withCredentials: true,
    })

    this.data = response.data
  },
  methods: {
    getSkills(user) {
      const skills = []
      user.skills.forEach((skill) => skills.push(skill.name))
      return skills
    },
    fetch() {
      this.$fetch()
      this.filterDialog = false
    },
  },
}
</script>
