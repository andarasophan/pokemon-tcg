import services from '../axios/services'
import { transformToQuery } from '../utils/helpers'

// action types
export const CARDS_LOAD_REQUESTED = 'cardsLoad'

// mutation types
export const CARDS_LOADED = 'cardsLoaded'
export const SET_LIST_CARDS_CONFIG = 'setListCardsConfig'
export const SET_LIST_CARDS_FILTER = 'setListCardsFilter'
export const SET_PAGE = 'setPage'

const state = {
  cards: [],
  listCardConfig: {
    isLoading: false,
    totalData: 0,
    page: 1,
    search: '',
    filters: {
      types: [],
      rarity: 'ALL',
      set: 'ALL'
    }
  }
}

// will be used for mapGetters
const getters = {
  cards (state) {
    return state.cards
  },
  listCardConfig (state) {
    return state.listCardConfig
  },
  filters (state) {
    return state.listCardConfig.filters
  }
}

const actions = {
  [CARDS_LOAD_REQUESTED] ({ commit }, config) {
    const { search, types, rarity, set, page } = config
    commit(SET_LIST_CARDS_CONFIG, {
      key: 'isLoading',
      value: true
    })
    return new Promise((resolve, reject) => {
      let query = ''
      if (search) query += `name:"*${search}*"`
      if (types.length) {
        const typesQuery = transformToQuery(types, 'types')
        query += `${query ? ' ' : ''}${typesQuery}`
      }
      if (rarity !== 'ALL') query += `${query ? ' ' : ''}rarity:"${rarity}"`
      if (set !== 'ALL') query += `${query ? ' ' : ''}set.id:"${set}"`

      services.getCards({
        query,
        page: page
      })
        .then(({ data: { data, totalCount } }) => {
          commit(CARDS_LOADED, data)
          commit(SET_LIST_CARDS_CONFIG, {
            key: 'totalData',
            value: totalCount
          })
          resolve(data)
        })
        .catch((err) => reject(err))
        .finally(() => {
          commit(SET_LIST_CARDS_CONFIG, {
            key: 'isLoading',
            value: false
          })
        })
    })
  }
}

const mutations = {
  [SET_LIST_CARDS_CONFIG] (state, { key, value }) {
    state.listCardConfig[key] = value
  },
  [SET_LIST_CARDS_FILTER] (state, { key, value }) {
    state.listCardConfig.filters[key] = value

    // if any filter changes, page will reset to the first page
    state.listCardConfig.page = 1
  },
  [CARDS_LOADED] (state, payload) {
    state.cards = payload
  },
  [SET_PAGE] (state, page) {
    state.listCardConfig.page = page
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
