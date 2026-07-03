<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark flex justify-center">
    <!-- Main Content Container -->
    <main class="w-full min-h-screen bg-white dark:bg-background-dark relative flex flex-col overflow-x-hidden">
      
      <!-- Page Content -->
      <div class="flex-1 w-full pb-32 overflow-y-auto hide-scrollbar">
        <slot />
      </div>

      <!-- Bottom Navigation -->
      <BottomNavigation v-if="showBottomNav" />
    </main>
  </div>
</template>

<script setup>
import BottomNavigation from './BottomNavigation.vue'

defineProps({
  showBottomNav: {
    type: Boolean,
    default: true
  }
})
</script>
