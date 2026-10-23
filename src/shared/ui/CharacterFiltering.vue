<script setup lang="ts">
defineProps<{ label?: string; error?: string }>()
const model = defineModel<string>({ default: '' })
</script>

<template>
  <div>
    <label
      v-if="label"
      for="created_character_name"
      class="mb-1 block text-sm text-slate-500 dark:text-slate-400"
    >
      {{ label }}
    </label>

    <input
      name="created_character_name"
      v-model="model"
      :aria-invalid="!!error"
      class="w-full rounded-md border border-day-border bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-hover focus:outline-none aria-invalid:border-blood disabled:opacity-50 dark:border-night-border dark:bg-night-surface dark:text-white dark:focus:border-hover-dark"
    />

    <p v-if="error" class="mt-1 text-xs text-blood">{{ error }}</p>
  </div>
</template>
