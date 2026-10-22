<template>
  <section
    class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-1 md:mb-4"
    v-if="data?.length && !isLoading"
  >
    <CharacterCard
      v-for="character in data"
      :character="character"
      @click="router.push(`/character/${character.id}`)"
    />
  </section>

  <p v-else-if="isLoading" class="text-center text-slate-500 dark:text-slate-400">
    Scanning the Citadel archives...
  </p>

  <section v-else class="mx-auto max-w-md py-16 text-center">
    <h2 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">This dimension is empty</h2>
    <p class="mt-2 text-slate-600 dark:text-slate-300">
      Morty probably messed up again and destroyed this universe as well.
    </p>
  </section>

  <Pagination
    v-model="page"
    :total-pages="totalPages"
    :disabled="isPlaceholderData"
    v-if="data?.length"
  />
</template>

<script setup lang="ts">
import {
  PAGE_SIZE,
  useCharacterCount,
  useCharacters,
} from '@/entities/character/api/characterQueries'
import CharacterCard from '@/shared/ui/CharacterCard.vue'
import Pagination from '@/shared/ui/Pagination.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const page = computed({
  get: () => Math.max(1, Number(route.query.page) || 1),
  set: (p) => router.push({ query: { ...route.query, page: p } }),
})

const { data, isLoading, isPlaceholderData } = useCharacters(page)
const { data: count } = useCharacterCount()
const totalPages = computed(() => Math.max(1, Math.ceil((count.value ?? 0) / PAGE_SIZE)))
</script>
