<template>
  <h2
    class="mb-4 border-l-4 border-hover pl-3 font-display text-2xl font-bold uppercase tracking-widest text-slate-900 dark:border-hover-dark dark:text-white"
  >
    Characters
  </h2>

  <CharacterFilter v-model="filters" />

  <section
    class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-1 md:mb-4"
    v-if="characters?.length && !isLoading"
  >
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
      @click="router.push(`/character/${character.id}`)"
    />
  </section>

  <p v-else-if="isLoading" class="text-center text-slate-500 dark:text-slate-400">
    Scanning the Citadel archives...
  </p>

  <section v-else class="mx-auto max-w-md py-16 text-center">
    <h3 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">This dimension is empty</h3>
    <p class="mt-2 text-slate-600 dark:text-slate-300">
      Morty probably messed up again and destroyed this universe as well.
    </p>
  </section>

  <Pagination
    v-model="page"
    :total-pages="totalPages"
    :disabled="isPlaceholderData"
    v-if="characters?.length"
  />

  <section class="mt-2 border-t border-gray-600 py-4 md:mt-4" v-if="createdCharactersLength">
    <h2
      class="mb-4 border-l-4 border-hover pl-3 font-display text-2xl font-bold uppercase tracking-widest text-slate-900 dark:border-hover-dark dark:text-white"
    >
      Created Characters
    </h2>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <CreatedCharacterCard
        v-for="character in createdCharacterArray"
        :key="character.id"
        :created-character="character"
        @click="router.push(`/created_character/${character.id}`)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCreatedCharacterStore } from '@/app/providers/createdCharacterStore'
import {
  hasFilters,
  PAGE_SIZE,
  useCharacterCount,
  useCharacters,
  useFilteredCharacters,
} from '@/entities/character/api/characterQueries'
import {
  type CharacterFilters,
  CharacterStatus,
  CharacterGender,
} from '@/entities/character/model/model'
import CharacterCard from '@/shared/ui/CharacterCard.vue'
import CharacterFilter from '@/shared/ui/CharacterFilter.vue'
import CreatedCharacterCard from '@/shared/ui/CreatedCharacterCard.vue'
import Pagination from '@/shared/ui/Pagination.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const createdCharacterStore = useCreatedCharacterStore()

const createdCharactersLength = computed(() => {
  return createdCharacterStore.createdCharacterArray.length
})

const { createdCharacterArray } = storeToRefs(useCreatedCharacterStore())

const page = computed({
  get: () => Math.max(1, Number(route.query.page) || 1),
  set: (p) => router.push({ query: { ...route.query, page: p } }),
})

const totalPages = computed(() => Math.max(1, Math.ceil((count.value ?? 0) / PAGE_SIZE)))

const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)

const filters = computed<CharacterFilters>({
  get: () => {
    const { name, species, status, gender } = route.query
    const s = str(status)
    const g = str(gender)
    return {
      name: str(name),
      species: str(species),
      status: Object.values(CharacterStatus).find((v) => v === s),
      gender: Object.values(CharacterGender).find((v) => v === g),
    }
  },
  set: (f) => router.push({ query: { ...f, page: 1 } }),
})

const filtered = computed(() => hasFilters(filters.value))

const all = useCharacters(page)
const searched = useFilteredCharacters(page, filters)
const { data: count } = useCharacterCount()

const characters = computed(() => (filtered.value ? searched.data.value?.items : all.data.value))
const isLoading = computed(() => (filtered.value ? searched.isLoading.value : all.isLoading.value))
const isPlaceholderData = computed(() =>
  filtered.value ? searched.isPlaceholderData.value : all.isPlaceholderData.value,
)
</script>
