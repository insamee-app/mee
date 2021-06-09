<template>
  <AppCard class="w-full" :to="{ name: 'mee-id', params: { id: user.id } }">
    <template #avatar>
      <ProfileAvatar :user="user" />
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
    <template v-if="user.skills.length" #chips>
      <InsameeAppChips :texts="getSkills" />
    </template>
    <template #text>
      <div>
        {{ user.text | cutText }}
      </div>
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
    username() {
      const name = `${this.user.first_name ?? ''} ${this.user.last_name}`
      return name
    },
  },
}
</script>
