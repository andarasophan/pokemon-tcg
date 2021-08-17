import Vue from 'vue'
import VueAxios from 'vue-axios'

export default function setupAxios (axios) {
  Vue.use(VueAxios, axios)
  Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_API
  Vue.axios.interceptors.request.use(
    config => {
      config.headers['X-Api-Key'] = process.env.VUE_APP_API_KEY
      return config
    }
  )
}
