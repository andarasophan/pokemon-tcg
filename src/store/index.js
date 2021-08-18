import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import card from './card.module'
import type from './type.module'
import rarity from './rarity.module'
import set from './set.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    card,
    type,
    rarity,
    set
  }
})
