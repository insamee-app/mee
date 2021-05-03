<template>
  <ul>
    <AppListItem v-for="item in list" :key="item.name"
      ><component
        :is="item.path ? 'NuxtLink' : 'span'"
        :to="{ name: item.path }"
        >{{ item.name }}</component
      ></AppListItem
    >
  </ul>
</template>

<script>
export default {
  name: 'AppList',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
}
</script>
