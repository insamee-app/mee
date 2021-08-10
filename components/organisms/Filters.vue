<template>
  <form @submit.prevent="submit" @reset.prevent="reset">
    <InsameeLabeledItem
      label="Les compétences"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <ComboboxMultiple
        name="skills"
        variant="secondary"
        placeholder="Sélectionner une / des compétences"
        :value="filters['skills[]']"
        @selected="filters['skills[]'] = $event"
        @update="updateComboboxMultiple"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      label="Les centres d'intérêt"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <ComboboxMultiple
        name="focusInterests"
        variant="secondary"
        placeholder="Sélectionner un / des centres d'intérêt"
        :value="filters['focusInterests[]']"
        @selected="filters['focusInterests[]'] = $event"
        @update="updateComboboxMultiple"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      label="Les associations"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <ComboboxMultiple
        name="associations"
        variant="secondary"
        placeholder="Sélectionner une / des associations"
        :value="filters['associations[]']"
        @selected="filters['associations[]'] = $event"
        @update="updateComboboxMultiple"
      />
    </InsameeLabeledItem>
    <InsameeLabeledItem
      label="Les rôles"
      variant="secondary"
      class="mt-2"
      class-name="text-base"
    >
      <InsameeSelect
        :value="filters.currentRole"
        :dismiss-value="dismissSelect"
        :items="$store.getters['data/currentRoles']"
        placeholder="Sélectionner un rôle"
        variant="secondary"
        @selected="filters.currentRole = $event"
      />
    </InsameeLabeledItem>
    <div class="flex justify-between mt-4">
      <InsameeAppButton variant="secondary" border type="reset" shadow>
        Réinitialiser
      </InsameeAppButton>
      <InsameeAppButton variant="secondary" type="submit" shadow>
        Valider
      </InsameeAppButton>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Filters',
  data() {
    return {
      filters: {
        currentRole: {},
        'skills[]': [],
        'focusInterests[]': [],
        'associations[]': [],
      },
    }
  },
  computed: {
    dismissSelect() {
      return this.filters.currentRole.value ?? ''
    },
  },
  watch: {
    '$route.query'() {
      this.updateFilters()
    },
  },
  mounted() {
    this.updateSelect()
  },
  methods: {
    reset() {
      this.filters = {
        currentRole: {},
        'skills[]': [],
        'focusInterests[]': [],
        'associations[]': [],
      }
      this.submit()
    },
    submit() {
      this.$emit('submit', {
        currentRole: this.filters.currentRole.value,
        'skills[]': this.filters['skills[]'].map((el) => el.value),
        'focusInterests[]': this.filters['focusInterests[]'].map(
          (el) => el.value
        ),
        'associations[]': this.filters['associations[]'].map((el) => el.value),
      })
    },
    updateFilters() {
      this.updateSelect()
      this.updateComboboxMultiple('skills')
      this.updateComboboxMultiple('focusInterests')
      this.updateComboboxMultiple('associations')
    },
    updateComboboxMultiple(name) {
      const filter = this.$store.getters[`filters/${name}`]
      const data = this.$store.getters[`data/${name}`]
      this.filters[name + '[]'] = data.filter((el) => filter.includes(el.value))
    },
    updateSelect() {
      const filter = this.$store.getters['filters/currentRole']
      const data = this.$store.getters['data/currentRoles']
      this.filters.currentRole = data.find((el) => el.value === filter) ?? {}
    },
  },
}
</script>
