import {
  SET_SOURCE_MUTATION,
  SET_DESTINATION_MUTATION,
  SET_FILTER_MUTATION,
} from '@/store/filter'
import {
  SET_LOAD_START_MUTATION,
  SET_LOAD_END_MUTATION,
  LOAD_ACTION,
} from '~/store/call'

export function callPlugin(store) {
  store.subscribe(async ({ type }, state) => {
    if (
      [
        `filter/${SET_SOURCE_MUTATION}`,
        `filter/${SET_DESTINATION_MUTATION}`,
        `filter/${SET_FILTER_MUTATION}`,
      ].includes(type)
    ) {
      const source = state?.filter?.source?.value
      const destination = state?.filter?.destination?.value
      const loading = state?.company?.loading
      let filters = state?.filter?.filters
      filters = Object.keys(filters).filter((filterName) => filters[filterName])

      if (source && destination && filters.length > 0 && !loading) {
        store.commit(`call/${SET_LOAD_START_MUTATION}`, null, { root: true })

        await store.dispatch(
          `call/${LOAD_ACTION}`,
          { source, destination, filters, meta: { page: 1 } },
          { root: true }
        )

        store.commit(`call/${SET_LOAD_END_MUTATION}`, null, { root: true })
      }
    }
  })
}
