import BookView from '@/views/BookView.vue'
import CatalogView from '@/views/CatalogView.vue'
import LandingView from '@/views/LandingView.vue'
import UserRecommendationsView from '@/views/UserRecommendationsView.vue'
import UserSelectionView from '@/views/UserSelectionView.vue'
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
    {
      path: '/select-user',
      name: 'select-user',
      component: UserSelectionView,
    },
    {
      path: '/recomendaciones/:id',
      name: 'user-recommendations',
      component: UserRecommendationsView,
    },
    {
      path: '/books/:id',
      name: 'book-details',
      component: BookView,
    }
  ],
})

export default router
