<template>
  <v-pagination
    v-if="total > 0"
    :value="page"
    :length="total"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
    total-visible="7"
    @input="SET_PAGINATION_PAGE_MUTATION"
  ></v-pagination>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import {
  SET_PAGINATION_PAGE_MUTATION,
} from '@/store/pagination'

const { mapState, mapMutations } = createNamespacedHelpers('pagination')

export default {
  name: 'CallPaginationContainer',
  computed: mapState(['page', 'total']),
  watch: {
    page: 'changeRoute',
  },
  methods: {
    changeRoute(nextPage, prevPage) {
      if (nextPage !== prevPage) {
        const { query } = this.$route
        const { page } = this
        this.$router.push({ query: { ...query, page } })
      }
    },
    ...mapMutations([
      SET_PAGINATION_PAGE_MUTATION,
    ]),
  },
}
</script>
