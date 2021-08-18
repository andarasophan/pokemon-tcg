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
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    // check if authenticated, redirect to home
    beforeEnter: (to, from, next) => {
      if (!getLocalStorage('username')) next()
      else next('/')
    }
  },
  {
    path: '/error',
    name: 'Error',
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

export default router
