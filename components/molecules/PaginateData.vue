<template>
  <div class="flex flex-row items-center">
    <AppButton
      :disabled="!meta.previous_page_url"
      @click="handlePage(getPage(meta.previous_page_url))"
      >Précédent</AppButton
    >
    <div class="flex flex-grow justify-around mx-4">
      <AppPagination
        v-for="value in pages"
        :key="value"
        :active="meta.current_page === page(value)"
        @click="handlePage(page(value))"
      >
        {{ page(value) }}
      </AppPagination>
    </div>
    <AppButton
      :disabled="!meta.next_page_url"
      @click="handlePage(getPage(meta.next_page_url))"
      >Suivant</AppButton
    >
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PaginateData',
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pages() {
      return this.meta.last_page > 5 ? 5 : this.meta.last_page
    },
  },
  methods: {
    ...mapMutations(['filters/setUsersFilter']),
    getPage(value) {
      const getNumber = /(?<number>\d+)/i
      const { groups } = getNumber.exec(value)
      return groups.number
    },
    handlePage(value) {
      if (value) {
        this['filters/setUsersFilter']({ name: 'page', value })
        this.$emit('change')
      }
    },
    firstPageToShow(firstPage, currentPage, lastPage) {
      const middle = Math.trunc(this.pages / 2)
      if (currentPage - middle < firstPage) return 0

      if (currentPage + middle > lastPage) return lastPage - this.pages

      return currentPage - (middle + 1)
    },
    page(value) {
      return (
        value +
        this.firstPageToShow(
          this.meta.first_page,
          this.meta.current_page,
          this.meta.last_page
        )
      )
    },
  },
}
</script>
