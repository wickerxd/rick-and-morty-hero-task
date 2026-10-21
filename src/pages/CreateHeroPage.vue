<template>
  <main>
    <p class="text-3xl bg-red-500">hello</p>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// TODO composable or utils for fetch
const characters = ref<Record<string, unknown>[]>([])

const doGetCharacters = fetch('https://rickandmortyapi.com/api/character')
  .then((items) => {
    return items.json()
  })
  .then((val) => {
    characters.value = val.results
  })
</script>
