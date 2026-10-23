import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { Character } from '@/entities/character/model/model'
import CharacterCard from '../ui/CharacterCard.vue'

const testCharacter: Character = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://example.com/rick.jpeg',
  episode: [],
  url: '',
  created: '',
}

describe('CharacterCard', () => {
  it('has correct data', () => {
    const text = mount(CharacterCard, { props: { character: testCharacter } }).text()
    expect(text).toContain('Rick Sanchez')
    expect(text).toContain('Alive')
    expect(text).toContain('Human')
    expect(text).toContain('Citadel of Ricks')
  })
})
