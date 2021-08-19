import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, BIconChevronCompactDown, BIconX, BIconChatRightFill, BIconExclamationSquareFill } from 'bootstrap-vue'
import setupAxios from './axios/setupAxios'
import axios from 'axios'

Vue.config.productionTip = false

// Bind axios to vue instance
setupAxios(axios)

// Bootstrap components
Vue.use(BootstrapVue)
Vue.component('BIconChevronCompactDown', BIconChevronCompactDown)
Vue.component('BIconX', BIconX)
Vue.component('BIconChatRightFill', BIconChatRightFill)
Vue.component('BIconExclamationSquareFill', BIconExclamationSquareFill)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
