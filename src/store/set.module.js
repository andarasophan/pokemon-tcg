import services from '../axios/services'

// action types
export const SETS_LOAD_REQUESTED = 'setsLoad'

// mutation types
export const SETS_LOADED = 'setsLoaded'
export const SET_GETTING_SETS = 'setGettingSets'

const state = {
  setOptions: [],
  gettingSets: false
}

// will be used for mapGetters
const getters = {
  setOptions (state) {
    return state.setOptions
  },
  gettingSets (state) {
    return state.gettingSets
  }
}

const actions = {
  [SETS_LOAD_REQUESTED] ({ commit }) {
    commit(SET_GETTING_SETS, true)
    return new Promise((resolve, reject) => {
      services.getSets()
        .then(({ data: { data } }) => {
          commit(SETS_LOADED, data)
          resolve(data)
        })
        .catch(err => reject(err))
        .finally(() => {
          commit(SET_GETTING_SETS, false)
        })
    })
  }
}

const mutations = {
  [SET_GETTING_SETS] (state, value) {
    state.gettingSets = value
  },
  [SETS_LOADED] (state, payload) {
    state.setOptions = payload
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
