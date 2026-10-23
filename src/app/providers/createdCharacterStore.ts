import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { CreatedCharacter } from '@/entities/character/model/model'

export const useCreatedCharacterStore = defineStore('createdCharacterStore', () => {
  const createdCharacterArray = useStorage<CreatedCharacter[]>('created-characters', [])

  function createCharacter(newCharacter: CreatedCharacter) {
    if (!newCharacter) return false
    // note: Not sure if i should not allow the user to add a character if a character with the same name exists
    // since technically the same character could exist in other Universe
    // if (createdCharacterArray.value.filter((val) => val.name === newCharacter.name).length  === 0) {
    // }

    createdCharacterArray.value.push(newCharacter)
  }

  function getCharacter(id: string) {
    return createdCharacterArray.value.find((value) => value.id === id)
  }

  function removeCreatedCharacter(id: string) {
    createdCharacterArray.value = createdCharacterArray.value.filter((value) => value.id !== id)
  }

  return { createdCharacterArray, createCharacter, removeCreatedCharacter, getCharacter }
})
