import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import type { Character } from '../model/model'

const BASE_URL = 'https://rickandmortyapi.com/api'
export const PAGE_SIZE = 12

export function useCharacters(page: Ref<number>) {
  return useQuery({
    queryKey: ['characters', 'list', page],
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }): Promise<Character[]> => {
      const offset = (page.value - 1) * PAGE_SIZE
      const ids = Array.from({ length: PAGE_SIZE }, (_, i) => offset + i + 1).join(',')

      const res = await fetch(`${BASE_URL}/character/${ids}`, { signal })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)

      const data: Character | Character[] = await res.json()
      return Array.isArray(data) ? data : [data]
    },
  })
}

export function useCharacter(id: Ref<number>) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: async ({ signal }) => {
      const res = await fetch(`${BASE_URL}/character/${id.value}`, { signal })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      return (await res.json()) as Character
    },
  })
}

export function useCharacterCount() {
  return useQuery({
    queryKey: ['characters', 'count'],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async ({ signal }): Promise<number> => {
      const res = await fetch(`${BASE_URL}/character`, { signal })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const { info } = await res.json()
      return info.count
    },
  })
}
