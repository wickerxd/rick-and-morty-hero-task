<template>
  <h2
    class="mb-4 border-l-4 border-hover pl-3 font-display text-2xl font-bold uppercase tracking-widest text-slate-900 dark:border-hover-dark dark:text-white"
  >
    Selected Created Character
  </h2>
  <BackButton />
  <article
    v-if="character"
    class="overflow-hidden rounded-xl border border-day-border bg-white shadow-sm dark:border-transparent dark:bg-night-surface dark:shadow-none"
  >
    <div class="flex flex-col sm:flex-row">
      <img
        :src="character.image"
        loading="lazy"
        class="aspect-square w-full object-cover object-top sm:w-64 sm:shrink-0 sm:self-start md:w-72"
      />

      <div class="flex min-w-0 flex-1 flex-col gap-5 p-5 sm:p-6">
        <header>
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-2xl font-bold leading-tight text-slate-900 dark:text-white">
              {{ character.name }}
            </h3>
          </div>
        </header>

        <dl class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-slate-500 dark:text-slate-400">Gender:</dt>
            <dd class="text-lg text-slate-900 dark:text-white">{{ character.gender }}</dd>
          </div>
        </dl>

        <button
          type="button"
          class="mt-auto w-fit cursor-pointer rounded-lg bg-blood px-4 py-2 font-medium text-slate-900 transition hover:brightness-90 hover:shadow-[0_0_16px_rgba(229,72,77,0.45)] active:brightness-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blood disabled:pointer-events-none disabled:opacity-50"
          @click="deleteCreatedCharacter()"
        >
          Delete Character
        </button>
      </div>
    </div>
  </article>

  <section v-else class="mx-auto max-w-md py-16 text-center">
    <h2 class="mt-4 text-2xl font-bold text-slate-900 dark:text-white">This log is empty</h2>
    <p class="mt-2 text-slate-600 dark:text-slate-300">
      This is a bottomless pit of despair. Nothing to be found here
    </p>
  </section>
</template>

<script setup lang="ts">
import { useCreatedCharacterStore } from '@/app/providers/createdCharacterStore'
import { type CreatedCharacter } from '@/entities/character/model/model'
import BackButton from '@/shared/ui/BackButton.vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = computed(() => String(route.params.characterId))
const createdCharacterStore = useCreatedCharacterStore()

const character = ref<CreatedCharacter | undefined>(createdCharacterStore.getCharacter(id.value))

function deleteCreatedCharacter() {
  if (character.value) {
    createdCharacterStore.removeCreatedCharacter(character.value.id)
    if (window.history.state?.back) router.back()
    else router.push('/')
  }
}
</script>
