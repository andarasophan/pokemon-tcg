import Vue from 'vue'
import VueRouter from 'vue-router'
import { getLocalStorage } from '../utils/helpers'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layout/Layout.vue'),
    // check if not authenticated, redirect to login
    beforeEnter: (to, from, next) => {
      if (getLocalStorage('username')) next()
      else next('/login')
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: {
          title: 'Pokemon - Home'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: 'Pokemon - Login'
    },
    // check if authenticated, redirect to home
    beforeEnter: (to, from, next) => {
      if (!getLocalStorage('username')) next()
      else next('/')
    }
  },
  {
    path: '/error',
    name: 'Error',
    meta: {
      title: 'Pokemon - Error'
    },
    component: () => import('@/views/Error.vue')
  },
  {
    path: '/*',
    redirect: '/error'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// set meta title to document each time route changed
router.afterEach((to) => {
  document.title = to.meta.title
})

export default router
