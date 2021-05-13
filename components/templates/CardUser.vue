<template>
  <AppCard class="w-full" :to="{ name: 'mee-id', params: { id: user.id } }">
    <template #avatar>
      <AppCardAvatar />
    </template>
    <template #title>
      <AppCardTitle>
        <span>{{ user.first_name }}</span>
        <span>{{ user.last_name }}</span>
      </AppCardTitle>
    </template>
    <template v-if="user.associations.length" #associations>
      <AppCardAssociations :associations="user.associations" />
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
</template>

<script>
export default {
  name: 'CardUser',
  props: {
    user: {
      type: Object,
      required: true,
    },
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
