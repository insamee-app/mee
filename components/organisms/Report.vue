<template>
  <div>
    <InsameeIconSpinner
      v-if="$fetchState.pending"
      class="h-6 w-6 text-grey-secondary-base fill-current animate-spin"
    />
    <div
      v-else-if="report || errorReport"
      class="text-sm text-grey-secondary-base"
    >
      <template v-if="errorReport"> {{ errorReport }} </template>
      <template v-else-if="report.already"> {{ alreadyReported }} </template>
      <template v-else> Merci de votre signalement </template>
    </div>

    <slot v-else :on="{ click: onClick }"></slot>
    <Portal v-if="modal">
      <InsameeAppModal :value="modal" @outside="modal = $event">
        <ReportCard
          :type="type"
          @close="modal = !$event"
          @report="report = $event"
        />
      </InsameeAppModal>
    </Portal>
  </div>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'

export default {
  name: 'Report',
  components: {
    Portal,
  },
  props: {
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['profiles', 'associations'].includes(value)
      },
    },
  },
  data() {
    return {
      modal: false,
      report: undefined,
      errorReport: '',
    }
  },
  async fetch() {
    const { id } = this.$route.params
    try {
      const response = await this.$axios.get(
        `/api/v1/reports/${this.type}/${id}`
      )
      this.report = response.data
    } catch (error) {
      if (error.response.status === 404) return
      this.errorReport = 'Une erreur est survenue'
    }
  },
  computed: {
    alreadyReported() {
      if (this.type === 'profiles') return 'Vous avez déjà signalé ce profil'
      else if (this.type === 'associations')
        return 'Vous avez déjà signalé cette association'
      return ''
    },
  },
  methods: {
    onClick() {
      this.modal = true
    },
  },
}
</script>
