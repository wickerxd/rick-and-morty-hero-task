import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import CreatedCharacterPage from '@/pages/CreateCharacterPage.vue'
import FavouritesPage from '@/pages/FavouritesPage.vue'
import SelectedCharacterPage from '@/pages/SelectedCharacterPage.vue'
import SelectedCreatedCharacterPage from '@/pages/SelectedCreatedCharacterPage.vue'
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
      component: CreatedCharacterPage,
    },
    {
      path: '/created_character/:characterId',
      name: 'selected_created_character',
      component: SelectedCreatedCharacterPage,
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: FavouritesPage,
    },
    {
      path: '/character/:characterId',
      name: 'selected_character',
      component: SelectedCharacterPage,
    },
  ],
})

export default router
