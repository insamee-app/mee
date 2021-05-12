<template>
  <section>
    <AppSelect
      v-model="currentRole"
      name="currentRole"
      :items="currentRoles"
      label="Rôles"
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
// TODO: il faut établir comment on gère ça dans le composant filtre
// le mieux étant de faire un sous composant généric qui fetch (comme ça en cas d'erreurs, ils sont autonomes)
// et on met dans le store => si c'est déjà présent alors on fetch pas btw
// dans un store data => on nomme le store data et on le met en place pour les data no paginée
// il faut aussi utilise un fetch pour le mee afin de pouvoir utiliser les $pending et surtout refaire un fetch lorsque on appuie sur valider
// il faut faire un slot qui prend les data en paramète (et un default pour pas le faire à chaque fois) et pour les bde (associaitons) (il faut ajouter l'école après)
export default {
  name: 'FiltersUsers',
  data() {
    return {
      currentRoles: [
        { id: 'étudiant', name: 'étudiant' },
        { id: 'personnel', name: 'personnel' },
      ],
      currentRole: '',
    }
  },
  watch: {
    currentRole(value) {
      const newValue = value === '' ? undefined : value
      this.handleSelect('currentRole', newValue)
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
