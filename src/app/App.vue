<script setup lang="ts">
import AppFooter from '@/widgets/app-footer/AppFooter.vue'
import AppHeader from '@/widgets/app-header/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="container flex flex-col gap-4 mx-auto px-4 sm:px-6 lg:px-8">
    <AppHeader />
    <RouterView v-slot="{ Component }">
      <KeepAlive>
        <component :is="Component" />
      </KeepAlive>
    </RouterView>
    <AppFooter />
  </main>
</template>
