import { destroyLocalStorage, getLocalStorage, saveLocalStorage } from '../utils/helpers'

// action types
export const LOGIN = 'login'
export const LOGOUT = 'logout'

// mutation types
export const RESET_AUTH = 'resetAuth'
export const SET_AUTH = 'setAuth'

const state = {
  user: getLocalStorage('username')
}

// will be used for mapGetters
const getters = {
  currentUser (state) {
    return state.user
  }
}

const actions = {
  [LOGIN] ({ commit }, payload) {
    // dummy login delay
    return new Promise(resolve => {
      setTimeout(() => {
        commit(SET_AUTH, payload)
        resolve(payload)
      }, 2000)
    })
  },
  [LOGOUT] ({ commit }) {
    commit(RESET_AUTH)
  }
}

const mutations = {
  [SET_AUTH] (state, user) {
    const { username } = user
    state.user = username
    saveLocalStorage('username', username)
  },
  [RESET_AUTH] (state) {
    state.user = null
    destroyLocalStorage('username')
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
