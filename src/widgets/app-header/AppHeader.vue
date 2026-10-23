<template>
  <header
    class="flex flex-col border-b border-gray-600 py-4 gap-4 justify-center md:gap-0 md:flex-row md:justify-between md:items-center"
  >
    <h1 class="text-center hoverable-glow inline-block font-display text-4xl font-bold sm:text-5xl">
      <RouterLink to="/">
        Citadel <span class="text-hover dark:text-hover-dark">Log</span>
      </RouterLink>
    </h1>
    <nav class="flex flex-row items-center justify-between gap-4">
      <RouterLink class="hoverable-glow" to="/favourite">Favourite Characters</RouterLink>
      <RouterLink class="hoverable-glow" to="/create">Create a character </RouterLink>
      <button
        type="button"
        aria-label="Toggle theme"
        @click="toggleDark()"
        class="group cursor-pointer grid h-9 w-9 place-items-center text-slate-700 transition duration-200 hover:text-hover hover:border-hover dark:border-night-border dark:text-slate-200 dark:hover:text-hover-dark dark:hover:border-hover-dark"
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
