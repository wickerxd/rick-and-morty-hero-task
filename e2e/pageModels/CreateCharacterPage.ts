import { Locator, Page, expect } from '@playwright/test'

export class CreateCharacterPage {
  private readonly pageTitle: Locator
  private readonly characterName: Locator
  private readonly characterMaleGender: Locator
  private readonly characterImageURL: Locator
  private readonly submitButton: Locator
  private readonly confirmationMessage: Locator

  constructor(public readonly page: Page) {
    this.pageTitle = this.page.locator('h2')
    this.characterName = this.page.locator("input[name='name']")
    this.characterMaleGender = this.page.getByRole('radio', { name: 'Male', exact: true })
    this.characterImageURL = this.page.locator("input[name='url']")
    this.confirmationMessage = this.page.getByTestId('confirmation-message')
    this.submitButton = this.page.getByRole('button', { name: 'Submit' })
  }

  async assertPageIsLoaded() {
    await this.page.waitForLoadState('networkidle')
    await expect(this.pageTitle).toHaveText('Create a Character')
  }

  async assertCharacterHasBeenCreated() {
    await this.page.waitForLoadState('networkidle')

    // note: i'm skipping steps a bit to save time, the correct way is to pass the data from a json file in the .spec.ts file
    await this.characterName.fill('John Snow')
    await this.characterMaleGender.check()
    await this.characterImageURL.fill('https://rickandmortyapi.com/api/character/avatar/520.jpeg')
    await this.submitButton.click()
    await expect(this.confirmationMessage).toBeVisible()
  }
}
