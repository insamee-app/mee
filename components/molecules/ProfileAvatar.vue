<template>
  <div class="relative w-32 h-32 mr-8">
    <div
      class="
        w-full
        h-full
        overflow-hidden
        rounded-full
        flex flex-row
        justify-center
        items-center
      "
    >
      <ImgFetch
        class="w-full"
        :name="profile.user.avatar_id"
        :alt="`avatar de ${profile.first_name} ${profile.last_name}`"
      ></ImgFetch>
    </div>
    <div
      v-if="profile.current_role"
      class="absolute -right-4 bottom-0 flex flex-row"
    >
      <InsameeAppChip class="border-white border-2">
        {{ profile.current_role }}
      </InsameeAppChip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCardAvatar',
  props: {
    profile: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
