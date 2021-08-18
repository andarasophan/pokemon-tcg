import services from '../axios/services'

// action types
export const RARITIES_LOAD_REQUESTED = 'raritiesLoad'

// mutation types
export const RARITIES_LOADED = 'raritiesLoaded'
export const SET_GETTING_RARITIES = 'setGettingRarities'

const state = {
  rarityOptions: [],
  gettingRarities: false
}

// will be used for mapGetters
const getters = {
  rarityOptions (state) {
    return state.rarityOptions
  },
  gettingRarities (state) {
    return state.gettingRarities
  }
}

const actions = {
  [RARITIES_LOAD_REQUESTED] ({ commit }) {
    commit(SET_GETTING_RARITIES, true)
    services.getTypes()
      .then(({ data: { data } }) => {
        commit(RARITIES_LOADED, data)
      })
      .catch(() => {})
      .finally(() => {
        commit(SET_GETTING_RARITIES, false)
      })
  }
}

const mutations = {
  [SET_GETTING_RARITIES] (state, value) {
    state.gettingRarities = value
  },
  [RARITIES_LOADED] (state, payload) {
    state.rarityOptions = payload
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
