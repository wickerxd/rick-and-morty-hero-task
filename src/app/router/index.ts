import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import CreateHeroPage from '@/pages/CreateHeroPage.vue'
import FavouritesPage from '@/pages/FavouritesPage.vue'
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
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: FavouritesPage,
    },
    {
      path: '/character/:characterId',
      name: 'selected_character',
      component: SelectedHeroPage,
    },
  ],
})

export default router
