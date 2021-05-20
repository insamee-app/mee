<template>
  <section>
    <AppSelect
      v-model="currentRole"
      name="currentRole"
      :items="currentRoles"
      label="Rôles"
      choose-text
    />
    <FilterSelect
      name="skill"
      ressource="skills"
      label="Compétences"
      @selected="handleSelect"
    />
    <FilterSelect
      name="focusInterest"
      ressource="focus_interests"
      label="Centres d'intérêt"
      @selected="handleSelect"
    />
    <FilterSelect
      name="association"
      ressource="associations"
      label="Associations"
      @selected="handleSelect"
    >
      <template #option="{ item }">
        {{ associationOption(item) }}
      </template>
    </FilterSelect>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'FiltersUsers',
  data() {
    return {
      currentRoles: [
        { id: 'étudiant', name: 'étudiant' },
        { id: 'personnel', name: 'personnel' },
      ],
    }
  },
  computed: {
    currentRole: {
      get() {
        const value = this.$store.state.filters.users.currentRole
        return value === undefined ? '' : value
      },
      set(value) {
        const newValue = value === '' ? undefined : value
        this.handleSelect('currentRole', newValue)
      },
    },
  },
  methods: {
    ...mapMutations(['filters/setUsersFilter']),
    handleSelect(name, value) {
      this['filters/setUsersFilter']({ name, value })
    },
    associationOption(item) {
      let option = item.name
      if (item.school) option += ' - ' + item.school.name
      return option
    },
  },
}
</script>
