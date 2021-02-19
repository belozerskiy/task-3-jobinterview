<template>
  <CallFilter
    :source="source"
    :destination="destination"
    :countries="countries"
    @onFilterChange="SET_FILTERS_ACTION"
    @onSourceChange="SELECT_SOURCE_ACTION"
    @onDestinationChange="SELECT_DESTINATION_ACTION"
  />
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import {
  SET_FILTERS_ACTION,
  SELECT_SOURCE_ACTION,
  SELECT_DESTINATION_ACTION,
  LOAD_FILTER_ACTION,
} from '@/store/filter'

const { mapState, mapActions } = createNamespacedHelpers('filter')

export default {
  name: 'CallFilterContainer',
  async fetch() {
    const { source, destination, $store: store } = this
    await store.dispatch(
      `filter/${LOAD_FILTER_ACTION}`,
      { source, destination },
      { root: true }
    )
  },
  computed: mapState(['filters', 'source', 'destination', 'countries']),
  watch: {
    source: 'changeRoute',
    destination: 'changeRoute',
    filters: 'changeRoute',
  },
  methods: {
    changeRoute() {
      const { filters, source, destination } = this
      const src = source?.value
      const dst = destination?.value
      this.$router.push({ query: { filters, src, dst } })
    },
    ...mapActions([
      SET_FILTERS_ACTION,
      SELECT_SOURCE_ACTION,
      SELECT_DESTINATION_ACTION,
    ]),
  },
}
</script>
