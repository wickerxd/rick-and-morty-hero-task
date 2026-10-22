<script setup lang="ts">
import { useCharacter } from '@/entities/character/api/characterQueries'
import { CharacterStatus } from '@/entities/character/model/model'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useFavouriteCharacterStore } from '@/app/providers/favoureCharacterStore'
const route = useRoute()
const id = computed(() => String(route.params.characterId))
const { data, isLoading } = useCharacter(id)

const episodes = computed(() => data.value?.episode ?? [])

const favouriteCharacterStore = useFavouriteCharacterStore()

const statusColors = {
  Alive: 'bg-portal-strong dark:bg-portal',
  Dead: 'bg-blood',
  unknown: 'bg-slate-400',
} satisfies Record<string, string>

const statusDot = computed(() => statusColors[data.value?.status ?? 'unknown'])

const statusLabel = computed(() =>
  data.value?.status === CharacterStatus.Unknown ? 'Unknown' : data.value?.status,
)
</script>

<template>
  <article
    v-if="data"
    class="overflow-hidden rounded-xl border border-day-border bg-white shadow-sm dark:border-transparent dark:bg-night-surface dark:shadow-none"
  >
    <div class="flex flex-col sm:flex-row">
      <img
        :src="data.image"
        :alt="data.name"
        loading="lazy"
        class="aspect-square w-full object-cover object-top sm:w-64 sm:shrink-0 sm:self-start md:w-72"
      />

      <div class="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
        <header>
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-2xl font-bold leading-tight text-slate-900 dark:text-white">
              {{ data.name }}
            </h3>

            <button
              type="button"
              :aria-pressed="favouriteCharacterStore.isFavourite(data.id)"
              :aria-label="
                favouriteCharacterStore.isFavourite(data.id)
                  ? 'Remove from favourites'
                  : 'Add to favourites'
              "
              class="hoverable-glow shrink-0 rounded-full p-1.5"
              :class="
                favouriteCharacterStore.isFavourite(data.id) ? 'text-blood' : 'text-slate-400'
              "
              @click="favouriteCharacterStore.toggleFavourite(data.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                :fill="favouriteCharacterStore.isFavourite(data.id) ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
              </svg>
            </button>
          </div>

          <p class="mt-1 flex items-center gap-2 text-slate-700 dark:text-slate-100">
            <span class="size-2.5 rounded-full" :class="statusDot" aria-hidden="true"></span>
            <span>{{ statusLabel }}</span>
          </p>
        </header>

        <dl class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-slate-500 dark:text-slate-400">Species:</dt>
            <dd class="text-lg text-slate-900 dark:text-white">{{ data.species }}</dd>
          </div>
          <div>
            <dt class="text-sm text-slate-500 dark:text-slate-400">Gender:</dt>
            <dd class="text-lg text-slate-900 dark:text-white">{{ data.gender }}</dd>
          </div>
          <div v-if="data.type">
            <dt class="text-sm text-slate-500 dark:text-slate-400">Type:</dt>
            <dd class="text-lg text-slate-900 dark:text-white">{{ data.type }}</dd>
          </div>
          <div>
            <dt class="text-sm text-slate-500 dark:text-slate-400">Last known location:</dt>
            <dd class="text-lg text-slate-900 dark:text-white">{{ data.location.name }}</dd>
          </div>
          <div>
            <dt class="text-sm text-slate-500 dark:text-slate-400">First seen in:</dt>
            <dd class="text-lg text-slate-900 dark:text-white">
              Episode {{ data.episode?.at(0)?.split('/').at(-1) }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <section class="border-t border-day-border p-5 dark:border-night-border sm:p-6">
      <h4 class="mb-3 text-sm text-slate-500 dark:text-slate-400">
        Episodes ({{ episodes.length }})
      </h4>
      <ul class="flex max-h-40 flex-wrap gap-2 overflow-y-auto">
        <li v-for="url in episodes" :key="url">
          <a
            :href="url"
            target="_blank"
            rel="noopener noreferrer"
            class="hoverable block rounded-md border border-day-border px-3 py-1 text-sm text-slate-900 dark:border-night-border dark:text-white"
          >
            Episode {{ url.split('/').pop() }}
          </a>
        </li>
      </ul>
    </section>
  </article>

  <p v-else-if="isLoading" class="text-center text-slate-500 dark:text-slate-400">
    Scanning the Citadel archives...
  </p>

  <section v-else class="mx-auto max-w-md py-16 text-center">
    <h2 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">This log is empty</h2>
    <p class="mt-2 text-slate-600 dark:text-slate-300">
      Rick C-137 lead us here to waste our time.
    </p>
  </section>
</template>
