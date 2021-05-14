<template>
  <div>
    <div class="flex flex-row mb-8">
      <div class="w-32 h-32 rounded-full bg-primary-dark mr-8"></div>
      <div class="flex flex-col justify-between">
        <AppItemLabeled>
          <template #label>NOM</template>
          {{ user.last_name | handleUndefined }}
        </AppItemLabeled>
        <AppItemLabeled>
          <template #label>Prénom</template>
          {{ user.first_name | handleUndefined }}
        </AppItemLabeled>
      </div>
    </div>
    <AppItemLabeled class="mb-4">
      <template #label>Adresse électronique</template>
      {{ user.email | handleUndefined }}
    </AppItemLabeled>
    <div class="flex flex-row mb-4">
      <AppItemLabeled class="flex-1">
        <template #label>Ecole</template>
        {{ getSchoolName | handleUndefined }}
      </AppItemLabeled>
      <AppItemLabeled class="flex-1">
        <template #label>Année de diplomation</template>
        {{ user.graduation_year | handleUndefined }}
      </AppItemLabeled>
    </div>
    <AppItemLabeled v-if="user.focusInterests" class="mb-4">
      <template #label>Centres d'interêt</template>
      <AppChips :texts="getTexts(user.focusInterests)" />
    </AppItemLabeled>
    <AppItemLabeled v-if="user.skills" class="mb-4">
      <template #label>Compétences</template>
      <AppChips :texts="getTexts(user.skills)" />
    </AppItemLabeled>
    <AppItemLabeled v-if="user.associations" class="mb-4">
      <template #label>Associations</template>
      <AppAssociation
        v-for="association in user.associations"
        :key="association.id"
        class="mb-2"
        :uuid="association.image_id"
      >
        {{ association.name }}
      </AppAssociation>
    </AppItemLabeled>
    <AppItemLabeled class="mb-4 text-justify">
      <template #label>Description</template>
      {{ user.text | handleUndefined }}
    </AppItemLabeled>
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
