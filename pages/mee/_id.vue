<template>
  <InsameeMeeInsameeProfile
    :last-name="profile.last_name"
    :first-name="profile.first_name"
    :current-role="profile.current_role"
    :graduation-year="profile.graduation_year"
    :email="profile.user.email"
    :school-name="profile.school.name"
    :text="profile.insamee_profile.text"
    :focus-interests="getTexts(profile.insamee_profile.focus_interests)"
    :skills="getTexts(profile.insamee_profile.skills)"
    :associations="profile.insamee_profile.associations"
    :socials="socials"
    :avatar-url="profile.url_picture"
  >
    <template #report>
      <Report v-slot="{ on }" type="profiles">
        <InsameeAppButton empty variant="grey-secondary" v-on="on">
          Signaler le mee
        </InsameeAppButton>
      </Report>
    </template>
  </InsameeMeeInsameeProfile>
</template>

<script>
import getTexts from '@/mixins/getTexts'

export default {
  mixins: [getTexts],
  middleware: 'authenticated',
  async asyncData({ params, $axios, error }) {
    const path = '/api/v1/profiles'
    const { id } = params

    try {
      const { data: profile } = await $axios.get(
        `${path}/${id}?populate=insamee&platform=insamee&serialize=full`
      )
      return {
        profile,
      }
    } catch (e) {
      error(e.response.data)
    }
  },
  head() {
    return {
      title: `Profil de ${this.profile.first_name}`,
    }
  },
  computed: {
    socials() {
      return {
        facebook: this.profile.url_facebook,
        instagram: this.profile.url_instagram,
        twitter: this.profile.url_twitter,
        mobile: this.profile.mobile,
        email: this.profile.user.email,
      }
    },
  },
}
</script>
