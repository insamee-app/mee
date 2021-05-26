<template>
  <AppCard class="w-full" :to="{ name: 'mee-id', params: { id: user.id } }">
    <template #avatar>
      <!-- TODO: il faut se faire les avatars -->
      <AppCardAvatar :avatar-id="user.avatar_id" />
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
        ><AppChips :texts="getSkills"
      /></AppCardActions>
    </template>
    <template #text>
      <AppCardText>{{ user.text | cutText }} </AppCardText>
    </template>
  </AppCard>
</template>

<script>
export default {
  name: 'CardUser',
  filters: {
    cutText(value) {
      if (!value) return
      const length = 120
      const text = value.slice(0, length)
      return text.length === length ? text + '...' : text
    },
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getSkills() {
      const skills = []
      this.user.skills.forEach((skill) => skills.push(skill.name))
      return skills
    },
  },
}
</script>
