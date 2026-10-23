import { Locator, Page, expect } from '@playwright/test'

export class ViewCharacterPage {
  private readonly pageTitle: Locator
  private readonly characterName: Locator

  constructor(public readonly page: Page) {
    this.pageTitle = this.page.locator('h2')
    this.characterName = this.page.locator('h3')
  }

  async assertPageIsLoaded() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.pageTitle).toHaveText('Selected Character')
  }

  async assertCharacterHasBeenLoaded(characterName: string) {
    await this.page.waitForLoadState('networkidle')
    await expect(this.characterName).toHaveText(characterName)
  }
}
