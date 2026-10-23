import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'
import type { Character, CharacterFilters } from '../model/model'

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

export function useCharacter(id: Ref<string>) {
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

export function useFavouriteCharacters(ids: Ref<string[]>) {
  return useQuery({
    queryKey: ['characters', 'favourites', ids],
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }): Promise<Character[]> => {
      if (!ids.value.length) return []

      const res = await fetch(`${BASE_URL}/character/${ids.value.join(',')}`, { signal })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)

      const data: Character | Character[] = await res.json()
      return Array.isArray(data) ? data : [data]
    },
  })
}

export const hasFilters = (f: CharacterFilters) => Object.values(f).some(Boolean)

export function useFilteredCharacters(page: Ref<number>, filters: Ref<CharacterFilters>) {
  return useQuery({
    queryKey: ['characters', 'filtered', page, filters],
    enabled: computed(() => hasFilters(filters.value)),
    placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => {
      const entries = Object.entries({ ...filters.value, page: page.value }).filter(([, v]) => v)
      const params = new URLSearchParams(entries.map(([k, v]) => [k, String(v)]))

      const res = await fetch(`${BASE_URL}/character/?${params}`, { signal })
      if (res.status === 404) return { items: [] as Character[], totalPages: 0 }
      if (!res.ok) throw new Error(`Request failed (${res.status})`)

      const data = await res.json()
      return { items: data.results as Character[], totalPages: data.info.pages as number }
    },
  })
}
