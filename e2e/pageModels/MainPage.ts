import { Locator, Page, expect } from '@playwright/test'

export class MainPage {
  private readonly mainTitle: Locator
  private readonly characterList: Locator
  private readonly characterCards: Locator
  private readonly createCharacterLink: Locator

  constructor(public readonly page: Page) {
    this.mainTitle = this.page.locator('h1')
    this.characterList = this.page.getByTestId('main-cast')
    this.characterCards = this.characterList.locator('article')
    this.createCharacterLink = this.page.getByRole('link', { name: 'Create a Character' })
  }

  async goToPage() {
    await this.page.goto('/')
  }

  async goToCharacterCreate() {
    await this.createCharacterLink.click()
  }

  async assertPageIsRunning() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.mainTitle).toHaveText('Citadel Log')
  }

  async assertCharactersAreLoaded() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.characterCards).toHaveCount(12)
    await expect(this.characterCards.first()).toBeVisible()
  }

  async getFirstCharacterInfo(index: number) {
    await this.page.waitForLoadState('networkidle')
    await expect(this.characterCards).toHaveCount(12)
    await expect(this.characterCards.first()).toBeVisible()

    const name = (await this.characterCards.nth(index).locator('h3').innerText()).trim()
    await this.characterCards.nth(index).click()
    return name
  }
}
