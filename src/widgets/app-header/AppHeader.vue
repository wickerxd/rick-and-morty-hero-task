<template>
  <header class="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between md:items-center">
    <h1 class="hoverable">
      <RouterLink to="/"> Rick and Morty Hero Citadel </RouterLink>
    </h1>

    <nav class="flex flex-row items-center justify-between gap-4">
      <RouterLink class="hoverable" to="/create">Favourites</RouterLink>
      <RouterLink class="hoverable" to="/favourite">Create a hero</RouterLink>
      <button
        type="button"
        aria-label="Toggle theme"
        @click="toggleDark()"
        class="group grid h-9 w-9 place-items-center text-slate-700 transition duration-200 hover:text-hover hover:border-hover dark:border-night-border dark:text-slate-200 dark:hover:text-hover-dark dark:hover:border-hover-dark"
      >
        <MoonSvg v-if="isDark" />
        <SunSvg v-else />
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import MoonSvg from '@/shared/icons/MoonSvg.vue'
import SunSvg from '@/shared/icons/SunSvg.vue'
import { RouterLink } from 'vue-router'

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
