import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import CreateHeroPage from '@/pages/CreateHeroPage.vue'
import FavouritesPage from '@/pages/MainPage.vue'
import SelectedHeroPage from '@/pages/SelectedHeroPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/create',
      name: 'create_hero',
      component: CreateHeroPage,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/favourite',
      name: 'favourite',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: FavouritesPage,
    },
    {
      path: '/character/:characterId',
      name: 'selected_chracacter',
      component: SelectedHeroPage,
    },
  ],
})

export default router
