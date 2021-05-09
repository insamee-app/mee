<template>
  <section class="pt-16 px-4">
    <div class="flex flex-row justify-end">
      <AppButton large @click="filterDialog = true">Filtrer</AppButton>
      <AppModal v-model="filterDialog">
        <div class="bg-grey-light rounded p-4">
          <div class="flex flex-row justify-between mb-2">
            <div class="text-xl font-bold">Filtres</div>
            <div @click="filterDialog = false">
              <IconDismiss
                class="h-8 w-8 fill-current text-primary-dark cursor-pointer"
              />
            </div>
          </div>
          <div class="mb-4">
            <AppSelect name="focusInterest" :items="focusInterestItems"
              >Centre d'interêt</AppSelect
            >
          </div>
          <div class="flex flex-row justify-end">
            <AppButton>Valider</AppButton>
          </div>
        </div>
      </AppModal>
    </div>
    <pre>{{ users }}</pre>
    <AppCard
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
    </AppCard>
  </section>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    let data = false
    try {
      const response = await $axios.get('/api/v1/users', {
        withCredentials: true,
      })
      data = response.data
    } catch (error) {
      console.error(error)
    }
    return {
      users: data,
    }
  },
  data() {
    return {
      filterDialog: false,
      focusInterestItems: [
        {
          id: 1,
          name: 'talent',
        },
        {
          id: 1,
          name: 'talent',
        },
        {
          id: 1,
          name: 'talent',
        },
        {
          id: 1,
          name: 'talent',
        },
      ],
    }
  },
  methods: {
    getSkills(user) {
      const skills = []
      user.skills.forEach((skill) => skills.push(skill.name))
      return skills
    },
  },
}
</script>
