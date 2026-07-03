<template>
  <AppLayout>
    <div class="px-6 pt-12 pb-6">
      <h1 class="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      <p class="text-slate-500 text-sm mt-1">Overview statistik MotoRent</p>
    </div>
    
    <div class="px-6 grid grid-cols-2 gap-4 mb-8">
      <BaseCard class="text-center">
        <p class="text-xs text-slate-500 uppercase font-bold mb-1">Total Motor</p>
        <p class="text-2xl font-black text-primary">24</p>
      </BaseCard>
      <BaseCard class="text-center">
        <p class="text-xs text-slate-500 uppercase font-bold mb-1">Aktif Disewa</p>
        <p class="text-2xl font-black text-amber-500">8</p>
      </BaseCard>
      <BaseCard class="text-center col-span-2">
        <p class="text-xs text-slate-500 uppercase font-bold mb-1">Pendapatan Bulan Ini</p>
        <p class="text-3xl font-black text-emerald-500">Rp 12.500.000</p>
      </BaseCard>
    </div>
    
    <div class="px-6 pb-24">
      <h3 class="font-bold mb-4">Aksi Cepat</h3>
      <div class="space-y-3">
        <BaseButton class="w-full" variant="outline" @click="$router.push('/admin/motors')">Kelola Motor</BaseButton>
        <BaseButton class="w-full" variant="outline" @click="$router.push('/history')">Laporan Transaksi</BaseButton>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from '../components/layout/AppLayout.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
</script>
