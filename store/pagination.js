export const SET_PAGINATION_PAGE_MUTATION = 'SET_PAGINATION_PAGE_MUTATION'
export const SET_PAGINATION_MUTATION = 'SET_PAGINATION_MUTATION'

export const SET_PAGINATION_ACTION = 'SET_PAGINATION_ACTION'

export const state = () => ({
  page: 1,
  total: 0,
})

export const mutations = {
  [SET_PAGINATION_MUTATION](state, { page, total }) {
    state.page = page
    state.total = total
  },
  [SET_PAGINATION_PAGE_MUTATION](state, page) {
    state.page = page
  },
}

export const actions = {
  [SET_PAGINATION_ACTION]({ commit }, pagination) {
    commit(SET_PAGINATION_MUTATION, pagination)
  },
}
