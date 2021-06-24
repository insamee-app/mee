<template>
  <InsameeMeeInsameeProfile
    :last-name="profile.last_name"
    :first-name="profile.first_name"
    :email="profile.user.email"
    :school-name="profile.school.name"
    :graduation-year="profile.graduation_year"
    :current-role="profile.current_role"
    :avatar-url="profile.avatarUrl"
    :text="profile.insameeProfile.text"
    :skills="getTexts(profile.insameeProfile.skills)"
    :focus-interests="getTexts(profile.insameeProfile.focusInterests)"
    :associations="profile.insameeProfile.associations"
    :socials="socials"
  />
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({ params, $axios }) {
    const path = '/api/v1/profiles'
    const { id } = params
    let profile
    try {
      const response = await $axios.get(`${path}/${id}?populate=insamee`, {
        withCredentials: true,
      })
      profile = response.data
    } catch (error) {
      console.error(error)
    }
    return {
      profile,
    }
  },
  data() {
    return {
      dialog: false,
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
