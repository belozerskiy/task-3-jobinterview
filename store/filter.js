export const SET_FILTER_MUTATION = 'SET_FILTER_MUTATION'
export const SET_COUNTRIES_MUTATION = 'SET_COUNTRIES_MUTATION'
export const SET_SOURCE_MUTATION = 'SET_SOURCE_MUTATION'
export const SET_DESTINATION_MUTATION = 'SET_DESTINATION_MUTATION'

export const LOAD_FILTER_ACTION = 'LOAD_FILTER_ACTION'
export const SET_FILTERS_ACTION = 'SET_FILTERS_ACTION'
export const SELECT_SOURCE_ACTION = 'SELECT_SOURCE_ACTION'
export const SELECT_DESTINATION_ACTION = 'SELECT_DESTINATION_ACTION'

export const state = () => ({
  filters: [],
  source: null,
  destination: null,
  countries: [],
})

export const mutations = {
  [SET_FILTER_MUTATION](state, value) {
    state.filters = value
  },
  [SET_COUNTRIES_MUTATION](state, countries) {
    state.countries = countries
  },
  [SET_SOURCE_MUTATION](state, source) {
    state.source = state.countries.filter(
      (country) => country.value === source
    )[0]
  },
  [SET_DESTINATION_MUTATION](state, destination) {
    state.destination = state.countries.filter(
      (country) => country.value === destination
    )[0]
  },
}

export const actions = {
  async [LOAD_FILTER_ACTION]({ commit }) {
    const country = await this.$service.country.find()
    commit(SET_COUNTRIES_MUTATION, country)
  },
  [SET_FILTERS_ACTION]({ commit }, filters) {
    commit(SET_FILTER_MUTATION, filters)
  },
  [SELECT_SOURCE_ACTION]({ commit }, source) {
    commit(SET_SOURCE_MUTATION, source)
  },
  [SELECT_DESTINATION_ACTION]({ commit }, destination) {
    commit(SET_DESTINATION_MUTATION, destination)
  },
}
