<script setup lang="ts">
import { CharacterStatus, type Character } from '@/entities/character/model/model'
import { computed } from 'vue'

const props = defineProps<{
  character: Character
}>()
const statusDot = computed(
  () =>
    ({
      Alive: 'bg-portal-strong dark:bg-portal',
      Dead: 'bg-blood',
      unknown: 'bg-slate-400',
    })[props.character.status],
)

const statusLabel = computed(() =>
  props.character.status === CharacterStatus.Unknown ? 'Unknown' : props.character.status,
)
</script>

<template>
  <article
    class="h-full overflow-hidden rounded-xl border cursor-pointer border-day-border bg-white transition hover:border-hover dark:border-transparent dark:bg-night-surface dark:hover:border-hover-dark"
  >
    <div class="relative">
      <img
        :src="character.image"
        :alt="character.name"
        loading="lazy"
        class="aspect-4/3 w-full object-cover"
      />
      <span
        class="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
      >
        <span class="size-2 rounded-full" :class="statusDot" aria-hidden="true"></span>
        {{ statusLabel }}
      </span>
    </div>
    <div class="min-w-0 p-4">
      <h3 class="truncate text-lg font-bold text-slate-900 dark:text-white">
        {{ character.name }}
      </h3>
      <p class="truncate text-sm text-slate-700 dark:text-slate-200">
        {{ character.species }}
      </p>
      <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Last known location:
        <span class="font-medium text-slate-900 dark:text-white">
          {{ character.location.name }}
        </span>
      </p>
    </div>
  </article>
</template>
