<template>
  <div class="space-y-4">
    <div class="flex flex-row">
      <ProfileAvatar :profile="profile" />
      <div class="flex flex-col justify-between">
        <InsameeLabeledItem label="NOM">
          {{ profile.last_name | handleUndefined }}
        </InsameeLabeledItem>
        <InsameeLabeledItem label="Prénom">
          {{ profile.first_name | handleUndefined }}
        </InsameeLabeledItem>
      </div>
    </div>
    <InsameeLabeledItem label="Adresse électronique">
      {{ profile.user.email | handleUndefined }}
    </InsameeLabeledItem>
    <div class="flex flex-row space">
      <InsameeLabeledItem class="flex-1" label="Ecole">
        {{ getSchoolName | handleUndefined }}
      </InsameeLabeledItem>
      <InsameeLabeledItem class="flex-1" label="Année de diplomation">
        {{ profile.graduation_year | handleUndefined }}
      </InsameeLabeledItem>
    </div>
    <InsameeLabeledItem
      v-if="profile.focusInterests.length"
      label="Centre d'intérêt"
    >
      <InsameeAppChips :texts="getTexts(profile.focus_interests)" />
    </InsameeLabeledItem>
    <InsameeLabeledItem v-if="profile.skills.length" label="Compétences">
      <InsameeAppChips :texts="getTexts(profile.skills)" />
    </InsameeLabeledItem>
    <InsameeLabeledItem v-if="profile.associations.length" label="Associations">
      <AppAssociation
        v-for="association in profile.associations"
        :key="association.id"
        class="mb-2"
        :uuid="association.image_id"
      >
        {{ association.name }}
      </AppAssociation>
    </InsameeLabeledItem>
    <InsameeLabeledItem class="text-justify" label="Description">
      {{ profile.text | handleUndefined }}
    </InsameeLabeledItem>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  filters: {
    handleUndefined(value) {
      return value || 'Non renseigné'
    },
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getSchoolName() {
      return this.profile.school?.name ?? undefined
    },
  },
  methods: {
    getTexts(tab) {
      if (!tab || tab.length === 0) return []

      const data = []
      for (const item of tab) {
        data.push(item.name)
      }
      return data
    },
  },
}
</script>
