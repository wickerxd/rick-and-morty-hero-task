<template>
  <form class="mb-6 grid grid-cols-2 items-end gap-3 md:grid-cols-5" @submit.prevent="submit">
    <TextInput v-model="filter.name" label="Name" />
    <TextInput v-model="filter.species" label="Species" />

    <label class="text-sm text-slate-500 dark:text-slate-400 md:mb-4">
      Status
      <select v-model="filter.status" class="select_input">
        <option value="">Any</option>
        <option v-for="s in Object.values(CharacterStatus)" :key="s">{{ s }}</option>
      </select>
    </label>

    <label class="text-sm text-slate-500 dark:text-slate-400 md:mb-4">
      Gender
      <select v-model="filter.gender" class="select_input">
        <option value="">Any</option>
        <option v-for="g in CharacterGender" :key="g">{{ g }}</option>
      </select>
    </label>

    <div class="col-span-2 flex gap-3 md:col-span-1">
      <button
        type="submit"
        class="flex-1 cursor-pointer rounded-lg bg-portal px-4 py-2 font-medium text-slate-900 transition hover:bg-portal-strong hover:shadow-[0_0_16px_rgba(151,206,76,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portal"
      >
        Search
      </button>
      <button
        type="button"
        class="hoverable cursor-pointer px-2 text-slate-500 dark:text-slate-400"
        @click="reset"
      >
        Reset
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {
  CharacterGender,
  CharacterStatus,
  type CharacterFilters,
} from '@/entities/character/model/model'
import TextInput from '@/shared/ui/TextInput.vue'
import { ref } from 'vue'

const model = defineModel<CharacterFilters>({ required: true })

const blank = () => ({ name: '', species: '', status: '', gender: '' })

const filter = ref({
  name: model.value.name ?? '',
  species: model.value.species ?? '',
  status: model.value.status ?? '',
  gender: model.value.gender ?? '',
})

function submit() {
  model.value = Object.fromEntries(
    Object.entries(filter.value).filter(([, v]) => v.trim()),
  ) as CharacterFilters
}

function reset() {
  filter.value = blank()
  model.value = {}
}
</script>
