<template>
  <h2
    class="mb-4 border-l-4 border-hover pl-3 font-display text-2xl font-bold uppercase tracking-widest text-slate-900 dark:border-hover-dark dark:text-white"
  >
    Favourite Characters
  </h2>

  <section
    class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-1 md:mb-4"
    v-if="data?.length && !isLoading"
  >
    <CharacterCard
      v-for="character in data"
      :key="character.id"
      :character="character"
      @click="router.push(`/character/${character.id}`)"
    />
  </section>

  <p v-else-if="isLoading" class="text-center text-slate-500 dark:text-slate-400">
    Scanning the Citadel archives...
  </p>

  <section v-else class="mx-auto max-w-md py-16 text-center">
    <h2 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">No favourites yet</h2>
    <p class="mt-2 text-slate-600 dark:text-slate-300">Rick C-137 has no people left. That's sad</p>
  </section>

  <Pagination
    v-model="page"
    :total-pages="totalPages"
    :disabled="isPlaceholderData"
    v-if="data?.length"
  />
</template>

<script setup lang="ts">
import { PAGE_SIZE, useFavouriteCharacters } from '@/entities/character/api/characterQueries'
import { useFavouriteCharacterStore } from '@/app/providers/favoureCharacterStore'
import CharacterCard from '@/shared/ui/CharacterCard.vue'
import Pagination from '@/shared/ui/Pagination.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const { ids } = storeToRefs(useFavouriteCharacterStore())

const totalPages = computed(() => Math.max(1, Math.ceil(ids.value.length / PAGE_SIZE)))

const page = computed({
  get: () => Math.min(Math.max(1, Number(route.query.page) || 1), totalPages.value),
  set: (p) => router.push({ query: { ...route.query, page: p } }),
})

const pageIds = computed(() =>
  ids.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE),
)

const { data, isLoading, isPlaceholderData } = useFavouriteCharacters(pageIds)
</script>
