import { test as base } from '@playwright/test'
import { MainPage } from '../pageModels/MainPage.js'
import { ViewCharacterPage } from '../pageModels/ViewCharacterPage.js'
import { ViewFavouriteCharacterPage } from '../pageModels/ViewFavouriteCharacterPage.js'
import { CreateCharacterPage } from '../pageModels/CreateCharacterPage.js'

const url = 'http://localhost:5173/'
export const test = base.extend<{
  mainPage: MainPage
  viewCharacterPage: ViewCharacterPage
  viewFavoriteCharacterPage: ViewFavouriteCharacterPage
  createCharacterPage: CreateCharacterPage
}>({
  baseURL: url,
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page))
  },
  viewCharacterPage: async ({ page }, use) => {
    await use(new ViewCharacterPage(page))
  },
  viewFavoriteCharacterPage: async ({ page }, use) => {
    await use(new ViewFavouriteCharacterPage(page))
  },
  createCharacterPage: async ({ page }, use) => {
    await use(new CreateCharacterPage(page))
  },
})
