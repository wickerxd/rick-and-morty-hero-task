export interface Character {
  id: string
  name: string
  status: CharacterStatus
  species: string
  type: string
  gender: CharacterGender
  origin: LocationRef
  location: LocationRef
  image: string
  episode: string[]
  url: string
  created: string
}

export interface LocationRef {
  url: string
  name: string
}

export interface FavouriteCharacter extends Character {
  isFavourite: boolean
}

const CharacterGender = {
  Female: 'Female',
  Male: 'Male',
  Genderless: 'Genderless',
  Unknown: 'unknown',
} as const

type CharacterGender = (typeof CharacterGender)[keyof typeof CharacterGender]

export const CharacterStatus = { Alive: 'Alive', Dead: 'Dead', Unknown: 'unknown' } as const

export type CharacterStatus = (typeof CharacterStatus)[keyof typeof CharacterStatus]
