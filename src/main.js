import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import setupAxios from './axios/setupAxios'
import axios from 'axios'

Vue.config.productionTip = false

// Bind axios to vue instance
setupAxios(axios)

// Bootstrap components
Vue.use(BootstrapVue)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
