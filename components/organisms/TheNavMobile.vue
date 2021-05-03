<template>
  <div class="absolute top-0 bottom-0 right-0 bg-white w-10/12 z-20">
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
</template>

<script>
export default {
  name: 'TheNavMobile',
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
      this.$emit('close', false)
    },
  },
}
</script>
