import services from '../axios/services'

// action types
export const TYPES_LOAD_REQUESTED = 'typesLoad'

// mutation types
export const TYPES_LOADED = 'typesLoaded'
export const SET_GETTING_TYPES = 'setGettingTypes'

const state = {
  typeOptions: [],
  gettingTypes: false
}

// will be used for mapGetters
const getters = {
  typeOptions (state) {
    return state.typeOptions
  },
  gettingTypes (state) {
    return state.gettingTypes
  }
}

const actions = {
  [TYPES_LOAD_REQUESTED] ({ commit }) {
    commit(SET_GETTING_TYPES, true)
    return new Promise((resolve, reject) => {
      services.getTypes()
        .then(({ data: { data } }) => {
          commit(TYPES_LOADED, data)
          resolve(data)
        })
        .catch(err => reject(err))
        .finally(() => {
          commit(SET_GETTING_TYPES, false)
        })
    })
  }
}

const mutations = {
  [SET_GETTING_TYPES] (state, value) {
    state.gettingTypes = value
  },
  [TYPES_LOADED] (state, payload) {
    state.typeOptions = payload
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
