<template>
  <div>
    <div class="flex flex-row">
      <div class="relative w-32 h-32 mr-8">
        <div
          class="w-full h-full overflow-hidden rounded-full flex flex-row justify-center items-center"
        >
          <ImageShow
            :name="user.avatarId"
            :alt="`avatar de ${user.firstName} ${user.lastName}`"
          ></ImageShow>
        </div>
        <div
          v-if="user.currentRole"
          class="absolute -right-4 bottom-0 flex flex-row"
        >
          <AppChip class="border-white border-2">{{
            user.currentRole
          }}</AppChip>
        </div>
      </div>
      <div class="flex flex-col justify-between">
        <AppItemLabeled>
          <template #label>NOM</template>
          {{ user.lastName | handleUndefined }}
        </AppItemLabeled>
        <AppItemLabeled>
          <template #label>Prénom</template>
          {{ user.firstName | handleUndefined }}
        </AppItemLabeled>
      </div>
    </div>
    <AppItemLabeled class="mt-4">
      <template #label>Adresse électronique</template>
      {{ user.email | handleUndefined }}
    </AppItemLabeled>
    <div class="flex flex-row mt-4">
      <AppItemLabeled class="flex-1">
        <template #label>Ecole</template>
        {{ getSchoolName | handleUndefined }}
      </AppItemLabeled>
      <AppItemLabeled class="flex-1">
        <template #label>Année de diplomation</template>
        {{ user.graduationYear | handleUndefined }}
      </AppItemLabeled>
    </div>
    <AppItemLabeled v-if="user.focusInterests" class="mt-4">
      <template #label>Centres d'interêt</template>
      <AppChips :texts="getTexts(user.focusInterests)" />
    </AppItemLabeled>
    <AppItemLabeled v-if="user.skills" class="mt-4">
      <template #label>Compétences</template>
      <AppChips :texts="getTexts(user.skills)" />
    </AppItemLabeled>
    <AppItemLabeled v-if="user.associations" class="mt-4">
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
    <AppItemLabeled class="mt-4 text-justify">
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
