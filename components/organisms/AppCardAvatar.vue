<template>
  <ImageShow
    :name="avatarId"
    class="rounded-full bg-primary-dark w-32 h-32 mr-4"
  ></ImageShow>
</template>

<script>
export default {
  name: 'AppCardAvatar',
  props: {
    avatarId: {
      type: String,
      default: '',
    },
  },
}
</script>
