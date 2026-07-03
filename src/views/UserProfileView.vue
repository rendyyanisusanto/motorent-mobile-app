<template>
  <AppLayout>
    <!-- Header Section -->
    <header class="bg-white dark:bg-slate-900 pt-8 pb-6 px-6 rounded-b-xl shadow-sm border-b border-slate-100 dark:border-slate-800">
      <div class="flex flex-col items-center">
        <div class="relative group">
          <div class="w-24 h-24 rounded-full border-4 border-primary/10 overflow-hidden bg-slate-100">
            <img :src="user.avatar" alt="User Profile Picture" class="w-full h-full object-cover" />
          </div>
          <button class="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-900">
            <span class="material-icons text-[18px]">photo_camera</span>
          </button>
        </div>
        <h1 class="mt-4 text-2xl font-bold tracking-tight">{{ user.name }}</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">{{ user.email }}</p>
        <div class="mt-3 flex items-center space-x-2">
          <span class="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full flex items-center">
            <span class="material-icons text-[12px] mr-1">verified</span>
            PRO RENTER
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="px-6 mt-8 space-y-8">
      <!-- Verification Section -->
      <section>
        <h2 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Identity Verification</h2>
        <div class="grid grid-cols-2 gap-4">
          <!-- KTP Card -->
          <div class="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
            <div class="w-10 h-10 bg-primary/5 dark:bg-primary/20 rounded-full flex items-center justify-center mb-3">
              <span class="material-icons text-primary">badge</span>
            </div>
            <span class="text-sm font-semibold mb-1">KTP / ID Card</span>
            <span class="text-[10px] text-green-500 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">VERIFIED</span>
          </div>
          <!-- SIM Card -->
          <button class="bg-white dark:bg-slate-900 p-4 rounded-lg border-2 border-dashed border-primary/30 dark:border-primary/40 hover:bg-primary/5 transition-colors flex flex-col items-center text-center">
            <div class="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-3">
              <span class="material-icons text-slate-400">upload</span>
            </div>
            <span class="text-sm font-semibold mb-1">SIM / License</span>
            <span class="text-[10px] text-primary font-medium">UPLOAD NOW</span>
          </button>
        </div>
      </section>

      <!-- Account Settings List -->
      <section>
        <h2 class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Account Settings</h2>
        <div class="bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <a class="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800" href="#">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                <span class="material-icons text-[20px] text-blue-600">person_outline</span>
              </div>
              <span class="font-medium">Edit Profile</span>
            </div>
            <span class="material-icons text-slate-300">chevron_right</span>
          </a>
          <router-link to="/history" class="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                <span class="material-icons text-[20px] text-purple-600">history</span>
              </div>
              <span class="font-medium">Rental History</span>
            </div>
            <span class="material-icons text-slate-300">chevron_right</span>
          </router-link>
          <a class="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800" href="#">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                <span class="material-icons text-[20px] text-amber-600">account_balance_wallet</span>
              </div>
              <span class="font-medium">Payment Methods</span>
            </div>
            <span class="material-icons text-slate-300">chevron_right</span>
          </a>
          <a class="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" href="#">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                <span class="material-icons text-[20px] text-slate-600 dark:text-slate-400">help_outline</span>
              </div>
              <span class="font-medium">Help &amp; Support</span>
            </div>
            <span class="material-icons text-slate-300">chevron_right</span>
          </a>
        </div>
      </section>

      <!-- Dangerous Area -->
      <section class="pt-4 pb-8">
        <button @click="logout" class="w-full bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 text-red-500 font-bold py-4 rounded-lg shadow-sm hover:bg-red-50 dark:hover:bg-red-950/20 transition-all active:scale-[0.98] flex items-center justify-center space-x-2">
          <span class="material-icons text-[20px]">logout</span>
          <span>Logout</span>
        </button>
        <!-- App Version -->
        <div class="mt-8 text-center">
          <p class="text-[11px] text-slate-400 dark:text-slate-600 font-medium">MOTORENT MOBILE APP</p>
          <p class="text-[10px] text-slate-300 dark:text-slate-700 mt-1 uppercase">Version 1.0.4 • Build 102</p>
        </div>
      </section>
    </main>
  </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'
import AppLayout from '../components/layout/AppLayout.vue'

const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.user)

const logout = () => {
  router.push('/login')
}
</script>
