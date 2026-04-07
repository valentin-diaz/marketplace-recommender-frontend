import CatalogView from '@/views/CatalogView.vue'
import LandingView from '@/views/LandingView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
    },
  ],
})

export default router
