import { test } from './fixtures/rick-and-morty.js'

test('app is running', async ({ mainPage }) => {
  await mainPage.goToPage()
  await mainPage.assertPageIsRunning()
})

test('Characters are loaded', async ({ mainPage }) => {
  await mainPage.goToPage()
  await mainPage.assertPageIsRunning()
  await mainPage.assertCharactersAreLoaded()
})

test('Character data is loaded on click', async ({ mainPage, viewCharacterPage }) => {
  await mainPage.goToPage()
  await mainPage.assertPageIsRunning()
  const index = 3
  const getCharacterName = await mainPage.getFirstCharacterInfo(index)
  await viewCharacterPage.assertPageIsLoaded()
  await viewCharacterPage.assertCharacterHasBeenLoaded(getCharacterName)
})

test('User Can Create a Character', async ({ mainPage, createCharacterPage }) => {
  await mainPage.goToPage()
  await mainPage.assertPageIsRunning()
  await mainPage.goToCharacterCreate()
  await createCharacterPage.assertPageIsLoaded()
  await createCharacterPage.assertCharacterHasBeenCreated()
})
