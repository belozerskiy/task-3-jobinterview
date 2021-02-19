import { SET_PAGINATION_MUTATION } from '@/store/pagination'

export const SET_LIST_MUTATION = 'SET_LIST_MUTATION'
export const SET_LOAD_START_MUTATION = 'SET_LOAD_START_MUTATION'
export const SET_LOAD_END_MUTATION = 'SET_LOAD_END'

export const FETCH_LIST_ACTION = 'LOAD_ACTION'
export const RUN_PAGINATION_ACTION = 'RUN_PAGINATION_ACTION'

export const state = () => ({
  loading: false,
  list: [],
})

export const mutations = {
  [SET_LIST_MUTATION](state, companies) {
    state.list = companies
  },
  [SET_LOAD_START_MUTATION](state) {
    state.loading = true
  },
  [SET_LOAD_END_MUTATION](state) {
    state.loading = false
  },
}

export const actions = {
  async [FETCH_LIST_ACTION](
    { commit },
    { source, destination, filters = [], page = 1 }
  ) {
    if (source && destination && filters.length > 0) {
      commit(SET_LOAD_START_MUTATION)
      const { routes, pagination } = await this.$service.route.find({
        source: source?.value,
        destination: destination?.value,
        filters,
        meta: { page: Number(page) },
      })
      commit(`pagination/${SET_PAGINATION_MUTATION}`, pagination, {
        root: true,
      })
      commit(SET_LIST_MUTATION, routes)
      commit(SET_LOAD_END_MUTATION)
    }
  },
}
