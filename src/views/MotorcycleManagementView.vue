<template>
  <AppLayout>
    <div class="px-6 pt-12 pb-6 flex items-center gap-4">
      <button @click="$router.back()" class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
        <span class="material-icons">arrow_back</span>
      </button>
      <h1 class="text-xl font-bold">Kelola Motor</h1>
    </div>
    
    <div class="px-6 mb-6">
      <BaseButton class="w-full" leftIcon="add">Tambah Motor Baru</BaseButton>
    </div>
    
    <div class="px-6 pb-24 space-y-4">
      <div v-for="motor in motorStore.motors" :key="motor.id" class="p-4 bg-white dark:bg-slate-800 rounded-xl border flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img :src="motor.image" class="w-12 h-12 rounded object-cover" />
          <div>
            <h4 class="font-bold text-sm">{{ motor.name }}</h4>
            <p class="text-xs text-slate-500">{{ motor.status }}</p>
          </div>
        </div>
        <button class="text-slate-400 hover:text-primary"><span class="material-icons">edit</span></button>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../components/layout/AppLayout.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { useMotorStore } from '../stores/motorStore'

const motorStore = useMotorStore()
</script>
