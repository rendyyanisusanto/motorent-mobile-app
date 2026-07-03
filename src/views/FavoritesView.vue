<template>
  <AppLayout>
    <div class="px-6 pt-12 pb-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
      <h1 class="text-xl font-bold">Favorit Saya</h1>
    </div>

    <div class="px-6 py-4 pb-24 space-y-4">
      <div v-if="favoriteMotors.length > 0">
        <CardMotor 
          v-for="motor in favoriteMotors" 
          :key="motor.id" 
          :motor="motor" 
          @book="handleBooking"
          class="mb-4 relative"
        >
          <template #action>
            <button class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 flex items-center justify-center text-rose-500 shadow-sm border border-slate-100 dark:border-slate-700">
              <span class="material-icons text-sm">favorite</span>
            </button>
          </template>
        </CardMotor>
      </div>
      <div v-else class="text-center py-12">
        <div class="w-16 h-16 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
          <span class="material-icons text-2xl">favorite_border</span>
        </div>
        <h3 class="font-bold text-slate-700 dark:text-slate-200">Belum Ada Favorit</h3>
        <p class="text-xs text-slate-500 mt-1 mb-6">Anda belum menambahkan motor apapun ke daftar favorit.</p>
        <button @click="$router.push('/motors')" class="text-primary text-sm font-bold bg-primary/10 px-6 py-2 rounded-full">
          Cari Motor
        </button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import CardMotor from '../components/ui/CardMotor.vue'
import { useMotorStore } from '../stores/motorStore'

const router = useRouter()
const motorStore = useMotorStore()

// Mock logic: we just take the first two available motors as favorites for display purposes
const favoriteMotors = computed(() => {
  return motorStore.motors.slice(0, 2)
})

const handleBooking = (motor) => {
  router.push(`/motor/${motor.id}`)
}
</script>
