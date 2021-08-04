<template>
  <div>
    <InsameeIconSpinner
      v-if="loadingReasons"
      class="h-6 w-6 text-secondary-base fill-current animate-spin"
    />
    <div
      v-else-if="errorReasons || report"
      class="text-sm text-grey-secondary-base"
    >
      <template v-if="errorReasons"> Une erreur est survenue </template>
      <template v-else-if="!report.already">
        Merci de votre signalement
      </template>
      <template v-else-if="report.already">
        {{ alreadyReported }}
      </template>
    </div>
    <slot v-else :on="{ click: onClick }"></slot>
    <Portal>
      <InsameeAppModal :value="modal" @outside="modal = $event">
        <InsameeReport
          :loading="loading"
          :items="reasons"
          :error-message="errorReport"
          @close="modal = !$event"
          @send="send"
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
      loading: false,
      report: undefined,
      loadingReasons: false,
      errorReasons: false,
      errorReport: '',
    }
  },
  computed: {
    reasons() {
      return this.$store.getters[`data/${this.nameReason}`]
    },
    nameReason() {
      if (this.type === 'profiles') return 'reasonsProfiles'
      else if (this.type === 'associations') return 'reasonsAssociations'

      return ''
    },
    alreadyReported() {
      if (this.type === 'profiles') return 'Vous avez déjà signalé ce profil'
      else if (this.type === 'associations')
        return 'Vous avez déjà signalé cette association'
      return ''
    },
  },
  async created() {
    this.loadingReasons = true
    try {
      await this.$store.dispatch('data/fetch', this.nameReason)
    } catch (error) {
      this.errorReasons = true
    }
    this.loadingReasons = false
  },
  methods: {
    onClick() {
      this.modal = true
    },
    async send(data) {
      this.loading = true
      const id = this.$route.params.id
      try {
        const response = await this.$axios.post(
          `/api/v1/${this.type}/${id}/reports`,
          {
            reason: data.report.value,
            description: data.details,
          }
        )
        this.modal = false
        this.report = response.data
      } catch (error) {
        if ('errors' in error.response.data) {
          this.errorReport = error.response.data.errors[0].message
        } else {
          this.errorReport =
            "Une erreur est survenue. N'hésitez pas à nous contacter."
        }
      }
      this.loading = false
    },
  },
}
</script>
