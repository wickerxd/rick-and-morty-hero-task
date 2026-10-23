<template>
  <button
    type="button"
    class="hoverable group mb-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
    @click="goBack"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="transition-transform duration-200 group-hover:-translate-x-1"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
    Back
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  if (window.history.state?.back) router.back()
  else router.push('/')
}
</script>
