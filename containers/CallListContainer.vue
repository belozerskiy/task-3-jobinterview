<template>
  <v-row class="RouteListContainer text-center align-center">
    <template v-if="!loading">
      <v-col v-for="(routes, index) in list" :key="index" cols="12">
        <CallItem :routes="routes" />
      </v-col>
      <v-col cols="12">
        <div class="text-center">
          <CallPaginationContainer />
        </div>
      </v-col>
    </template>
    <template v-else>
      <v-col cols="12">
        <v-progress-circular
          :size="50"
          color="orange darker-2"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { FETCH_LIST_ACTION } from '@/store/call'
const { mapState: callMapState } = createNamespacedHelpers('call')
const { mapState: filterMapState } = createNamespacedHelpers('filter')
const { mapState: paginationMapState } = createNamespacedHelpers('pagination')

export default {
  name: 'CallListContainer',
  async fetch() {
    const { filters, source, destination, page } = this
    await this.$store.dispatch(
      `call/${FETCH_LIST_ACTION}`,
      {
        source,
        destination,
        filters,
        page,
      },
      { root: true }
    )
  },
  computed: {
    ...paginationMapState(['page']),
    ...callMapState(['list', 'loading']),
    ...filterMapState(['source', 'destination', 'filters']),
  },
  watch: {
    '$route.query.page': '$fetch',
    '$route.query.filters': '$fetch',
    '$route.query.src': '$fetch',
    '$route.query.dst': '$fetch',
  },
}
</script>

<style scoped>
.RouteListContainer {
  height: 100%;
}
</style>
