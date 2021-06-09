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
        :name="user.avatar_id"
        :alt="`avatar de ${user.first_name} ${user.last_name}`"
      ></ImgFetch>
    </div>
    <div
      v-if="user.current_role"
      class="absolute -right-4 bottom-0 flex flex-row"
    >
      <InsameeAppChip class="border-white border-2">
        {{ user.current_role }}
      </InsameeAppChip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCardAvatar',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
