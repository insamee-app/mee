<script>
export default {
  name: 'AppTeam',
}
</script>

<template>
  <InsameeAppTeam
    :link-tutorat="$config.tutoratURL"
    :link-evenements="$config.evenementsURL"
    :link-associations="$config.associationsURL"
    link-insamee="/"
  >
    <template #tutorat="{ classIcon }">
      <NuxtImg
        src="/logos/tutorat.png"
        height="24"
        :class="classIcon"
        alt="logo de la plateforme tutorat"
      />
    </template>
    <template #evenements="{ classIcon }">
      <NuxtImg
        src="/logos/evenements.png"
        height="24"
        :class="classIcon"
        alt="logo de la plateforme evènements"
      />
    </template>
    <template #associations="{ classIcon }">
      <NuxtImg
        src="/logos/associations.png"
        height="24"
        :class="classIcon"
        alt="logo de la plateforme associations"
      />
    </template>
    <template #mee="{ classIcon }">
      <NuxtImg
        src="/logos/mee.png"
        height="24"
        :class="classIcon"
        alt="logo de la plateforme mee"
      />
    </template>
  </InsameeAppTeam>
</template>
