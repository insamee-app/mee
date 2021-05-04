<template>
  <div
    v-if="value"
    class="fixed top-0 bottom-0 right-0 left-0 z-10 flex flex-row justify-end"
  >
    <div class="absolute w-full h-full" @click="close"></div>
    <div class="relative h-full w-8/12 bg-white">
      <div class="flex justify-end pt-4 px-4 pb-6">
        <div @click="close">
          <IconDismiss class="text-primary-base h-8 w-8 fill-current" />
        </div>
      </div>
      <AppList class="px-4 mb-8" :list="nav"></AppList>
      <div class="flex justify-center">
        <AppButton class="mr-6" :to="{ name: 'login' }">Se connecter</AppButton>
        <AppButton border :to="{ name: 'signin' }">S'inscrire</AppButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavMobile',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      nav: [
        {
          name: 'Accueil',
          path: 'index',
        },
        {
          name: 'Trouver des Mee',
          path: 'mee',
        },
        {
          name: 'Contact',
          path: 'contact',
        },
      ],
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
  },
}
</script>
