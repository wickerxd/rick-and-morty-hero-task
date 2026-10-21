<script setup lang="ts">
import AppHeader from '@/widgets/app-header/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- TODO add Suspense -->
  <!-- TODO Add Keep Alive -->
  <main class="container mx-auto px-4 sm:px-6 lg:px-8">
    <AppHeader />
    <RouterView />
  </main>
</template>
