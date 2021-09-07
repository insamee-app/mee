<script>
export default {
  name: 'ReportCard',
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
      reasons: [],
      errorMessage: '',
      loading: false,
    }
  },
  async fetch() {
    try {
      await this.$store.dispatch('data/fetch', this.nameReason)
      this.reasons = this.$store.getters[`data/${this.nameReason}`]
    } catch (error) {
      this.reasons = undefined
    }
  },
  computed: {
    nameReason() {
      if (this.type === 'profiles') return 'reasonsProfiles'
      else if (this.type === 'associations') return 'reasonsAssociations'

      return ''
    },
  },
  methods: {
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
        this.$emit('report', response.data)
        this.$emit('close', true)
      } catch (error) {
        if ('errors' in error.response.data) {
          this.errorMessage = error.response.data.errors[0].message
        } else {
          this.errorMessage =
            "Une erreur est survenue. N'hésitez pas à nous contacter."
        }
      }
      this.loading = false
    },
  },
}
</script>

<template>
  <InsameeReport
    :items="reasons"
    :loading="loading"
    :error-message="errorMessage"
    @close="$emit('close', $event)"
    @send="send"
  />
</template>
