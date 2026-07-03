<template>
  <AppLayout :showBottomNav="false">
    <div class="px-6 pt-12 pb-6 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800">
      <button @click="$router.back()" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span class="material-icons">arrow_back</span>
      </button>
      <h1 class="text-xl font-bold">Notifikasi</h1>
    </div>

    <div class="px-6 py-4 space-y-4 pb-24">
      <div v-for="i in 3" :key="i" class="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl flex gap-4">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <span class="material-icons text-primary text-sm">local_offer</span>
        </div>
        <div>
          <h4 class="font-bold text-sm">Promo Akhir Pekan!</h4>
          <p class="text-xs text-slate-500 mt-1 leading-relaxed">Nikmati diskon 20% untuk semua motor sport khusus penyewaan di akhir pekan ini. Jangan sampai kehabisan!</p>
          <span class="text-[10px] font-semibold text-slate-400 mt-2 block">1 jam yang lalu</span>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../components/layout/AppLayout.vue'
</script>
