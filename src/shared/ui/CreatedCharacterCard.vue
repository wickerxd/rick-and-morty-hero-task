<script setup lang="ts">
import { type CreatedCharacter } from '@/entities/character/model/model'

const props = defineProps<{
  createdCharacter: CreatedCharacter
}>()
</script>

<template>
  <article
    class="h-full overflow-hidden rounded-xl border cursor-pointer border-day-border bg-white transition hover:border-hover dark:border-transparent dark:bg-night-surface dark:hover:border-hover-dark"
  >
    <div class="relative">
      <img :src="createdCharacter.image" loading="lazy" class="aspect-4/3 w-full object-cover" />
    </div>
    <div class="min-w-0 p-4">
      <h3 class="truncate text-lg font-bold text-slate-900 dark:text-white">
        {{ createdCharacter.name }}
      </h3>
      <p class="truncate text-sm text-slate-700 dark:text-slate-200">
        {{ createdCharacter.gender }}
      </p>
    </div>
  </article>
</template>
