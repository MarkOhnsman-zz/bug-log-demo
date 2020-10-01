import { createRouter, createWebHashHistory } from 'vue-router'
// @ts-ignore
import Home from '../pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'redirect',
    redirect: '/',
    component: null
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
