<template>
  <div class="space-y-4">
    <div class="flex flex-row">
      <ProfileAvatar :user="user" />
      <div class="flex flex-col justify-between">
        <InsameeLabeledItem label="NOM">
          {{ user.last_name | handleUndefined }}
        </InsameeLabeledItem>
        <InsameeLabeledItem label="Prénom">
          {{ user.first_name | handleUndefined }}
        </InsameeLabeledItem>
      </div>
    </div>
    <InsameeLabeledItem label="Adresse électronique">
      {{ user.email | handleUndefined }}
    </InsameeLabeledItem>
    <div class="flex flex-row space">
      <InsameeLabeledItem class="flex-1" label="Ecole">
        {{ getSchoolName | handleUndefined }}
      </InsameeLabeledItem>
      <InsameeLabeledItem class="flex-1" label="Année de diplomation">
        {{ user.graduation_year | handleUndefined }}
      </InsameeLabeledItem>
    </div>
    <InsameeLabeledItem v-if="user.focus_interests" label="Centre d'intérêt">
      <InsameeAppChips :texts="getTexts(user.focus_interests)" />
    </InsameeLabeledItem>
    <InsameeLabeledItem v-if="user.skills" label="Compétences">
      <InsameeAppChips :texts="getTexts(user.skills)" />
    </InsameeLabeledItem>
    <InsameeLabeledItem v-if="user.associations" label="Associations">
      <AppAssociation
        v-for="association in user.associations"
        :key="association.id"
        class="mb-2"
        :uuid="association.image_id"
      >
        {{ association.name }}
      </AppAssociation>
    </InsameeLabeledItem>
    <InsameeLabeledItem class="text-justify" label="Description">
      {{ user.text | handleUndefined }}
    </InsameeLabeledItem>
  </div>
</template>

<script>
export default {
  name: 'UserProfil',
  filters: {
    handleUndefined(value) {
      return value || 'Non renseigné'
    },
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getSchoolName() {
      return this.user.school?.name ?? undefined
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
