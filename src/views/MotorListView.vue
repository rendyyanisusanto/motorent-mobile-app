<template>
  <AppLayout>
    <div class="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800">
      <button @click="$router.back()" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span class="material-icons">arrow_back</span>
      </button>
      <h1 class="text-xl font-bold">Semua Motor</h1>
    </div>

    <!-- Search & Filter Area -->
    <div class="px-6 py-4 space-y-4">
      <BaseInput v-model="searchQuery" left-icon="search" placeholder="Cari berdasarkan nama..." />
      
      <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        <button 
          v-for="cat in ['Semua', 'Matic', 'Manual', 'Sport', 'Touring']" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border',
            selectedCategory === cat 
              ? 'bg-primary text-white border-primary' 
              : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Inventory List -->
    <div class="px-6 pb-24 space-y-4">
      <div v-if="filteredMotors.length > 0">
        <CardMotor 
          v-for="motor in filteredMotors" 
          :key="motor.id" 
          :motor="motor" 
          @book="handleBooking"
          class="mb-4"
        />
      </div>
      <div v-else class="text-center py-12">
        <span class="material-icons text-4xl text-slate-300 mb-2">search_off</span>
        <h3 class="font-bold text-slate-700 dark:text-slate-200">Motor Tidak Ditemukan</h3>
        <p class="text-xs text-slate-500 mt-1">Coba ubah kata kunci pencarian atau filter Anda.</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import CardMotor from '../components/ui/CardMotor.vue'
import { useMotorStore } from '../stores/motorStore'

const router = useRouter()
const motorStore = useMotorStore()

const searchQuery = ref('')
const selectedCategory = ref('Semua')

const filteredMotors = computed(() => {
  let result = motorStore.motors
  
  if (selectedCategory.value !== 'Semua') {
    result = result.filter(m => m.type === selectedCategory.value)
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(m => m.name.toLowerCase().includes(q))
  }
  
  return result
})

const handleBooking = (motor) => {
  router.push(`/motor/${motor.id}`)
}
</script>
