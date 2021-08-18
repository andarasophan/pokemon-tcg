import axios from 'axios'

const LIST_CARD_URL = '/cards'
const LIST_SET_URL = '/sets'
const LIST_TYPE_URL = '/types'
const LIST_RARITY_URL = '/rarities'

const services = {
  getCards: ({ query, page }) => {
    let url = `${LIST_CARD_URL}?pageSize=20`
    if (query) url += `&q=${query}`
    if (page) url += `&page=${page}`
    return axios.get(encodeURI(url))
  },
  getSets: () => axios.get(LIST_SET_URL),
  getTypes: () => axios.get(LIST_TYPE_URL),
  getRarities: () => axios.get(LIST_RARITY_URL)
}

export default services
