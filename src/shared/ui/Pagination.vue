<script setup lang="ts">
import { watch } from 'vue'

const props = defineProps<{ totalPages: number; disabled?: boolean }>()
const page = defineModel<number>({ required: true })

function go(e: Event) {
  const input = e.target as HTMLInputElement
  const n = Math.round(Number(input.value))
  if (n >= 1) page.value = Math.min(n, props.totalPages)
  input.value = String(page.value)
}

watch(page, () => window.scrollTo({ top: 0, behavior: 'smooth' }))
</script>

<template>
  <nav aria-label="Pagination" class="flex items-center justify-center gap-4">
    <button
      class="hoverable disabled:pointer-events-none disabled:opacity-40"
      :disabled="disabled || page <= 1"
      @click="page--"
    >
      Prev
    </button>

    <label class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      Page
      <input
        type="number"
        inputmode="numeric"
        min="1"
        :max="totalPages"
        :value="page"
        :disabled="disabled"
        class="w-16 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none rounded-md border border-day-border bg-white px-2 py-1 text-center text-slate-900 focus:border-hover focus:outline-none dark:border-night-border dark:bg-night-surface dark:text-white dark:focus:border-hover-dark"
        @change="go"
      />
      of {{ totalPages }}
    </label>

    <button
      class="hoverable disabled:pointer-events-none disabled:opacity-40"
      :disabled="disabled || page >= totalPages"
      @click="page++"
    >
      Next
    </button>
  </nav>
</template>
