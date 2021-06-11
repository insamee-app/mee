<template>
  <AppCard
    class="w-full"
    :to="{ name: 'mee-id', params: { id: profile.user_id } }"
  >
    <template #avatar>
      <ProfileAvatar :profile="profile" />
    </template>
    <template #title>
      <AppCardTitle>
        <span>{{ profile.first_name }}</span>
        <span>{{ profile.last_name }}</span>
      </AppCardTitle>
    </template>
    <template v-if="profile.associations.length" #associations>
      <AppCardAssociations :associations="profile.associations" />
    </template>
    <template v-if="profile.skills.length" #chips>
      <InsameeAppChips :texts="getSkills" />
    </template>
    <template #text>
      <div>
        {{ profile.text | cutText }}
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
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getSkills() {
      const skills = []
      this.profile.skills.forEach((skill) => skills.push(skill.name))
      return skills
    },
    username() {
      const name = `${this.profile.first_name ?? ''} ${this.profile.last_name}`
      return name
    },
  },
}
</script>
