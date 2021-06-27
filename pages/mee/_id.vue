<template>
  <InsameeMeeInsameeProfile
    :last-name="profile.last_name"
    :first-name="profile.first_name"
    :current-role="profile.current_role"
    :graduation-year="profile.graduation_year"
    :email="profile.user.email"
    :school-name="profile.school.name"
    :text="profile.insameeProfile.text"
    :focus-interests="getTexts(profile.insameeProfile.focusInterests)"
    :skills="getTexts(profile.insameeProfile.skills)"
    :associations="profile.insameeProfile.associations"
    :socials="socials"
    :avatar-url="profile.avatarUrl"
  />
</template>

<script>
import getTexts from '@/mixins/getTexts'

export default {
  mixins: [getTexts],
  middleware: 'authenticated',
  async asyncData({ params, $axios }) {
    const path = '/api/v1/profiles'
    const { id } = params

    const { data: profile } = await $axios.get(`${path}/${id}?populate=insamee`)

    return {
      profile,
    }
  },
  computed: {
    socials() {
      return {
        facebook: this.profile.url_facebook,
        instagram: this.profile.url_instagram,
        twitter: this.profile.url_twitter,
        téléphone: this.profile.mobile,
      }
    },
  },
}
</script>
