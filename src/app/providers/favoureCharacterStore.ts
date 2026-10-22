import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useFavouriteCharacterStore = defineStore('favouriteCharacterStore', () => {
  // note: we could store directly the Character object but it's safer to store id's instead ( in case the character changes  )
  const ids = useStorage<string[]>('favoure-character-ids', [])

  function addFavourite(id: string) {
    if (!ids.value.includes(id)) {
      ids.value.push(id)
    }
  }

  function removeFavourite(id: string) {
    ids.value = ids.value.filter((item) => item !== id)
  }

  function toggleFavourite(id: string) {
    if (ids.value.includes(id)) {
      removeFavourite(id)
    } else {
      addFavourite(id)
    }
  }

  function isFavourite(id: string) {
    return ids.value.includes(id)
  }

  return { ids, addFavourite, removeFavourite, toggleFavourite, isFavourite }
})
