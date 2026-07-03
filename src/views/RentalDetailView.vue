<template>
  <AppLayout>
    <div class="px-6 pt-12 pb-6 flex items-center gap-4 bg-white dark:bg-slate-950 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800">
      <button @click="$router.back()" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span class="material-icons">arrow_back</span>
      </button>
      <h1 class="text-xl font-bold">Detail Pesanan</h1>
    </div>

    <div v-if="isLoading" class="flex justify-center p-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
    
    <div v-else-if="errorMessage" class="px-6 pt-4">
      <div class="p-4 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
        {{ errorMessage }}
      </div>
    </div>

    <div v-else-if="rental" class="px-6 space-y-6 pt-4 pb-24">
      <!-- Status Header -->
      <BaseCard class="text-center">
        <div class="inline-flex justify-center mb-3">
          <BaseBadge :variant="getStatusVariant(rental.status)">{{ formatStatus(rental.status) }}</BaseBadge>
        </div>
        <h2 class="text-lg font-bold">Order #{{ rental.booking_code }}</h2>
        <p class="text-sm text-slate-500 mt-1">Dibuat pada {{ formatDateTime(rental.created_at) }}</p>
      </BaseCard>

      <!-- Motor Info -->
      <BaseCard class="flex gap-4 items-center">
        <div class="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
          <img v-if="rental.motorcycle?.images?.[0]?.url" :src="rental.motorcycle.images[0].url" :alt="rental.motor_name" class="w-full h-full object-cover" />
          <img v-else src="../assets/dummy_motor.png" :alt="rental.motor_name" class="w-full h-full object-cover" />
        </div>
        <div>
          <h3 class="font-bold text-lg">{{ rental.motor_name }}</h3>
          <p class="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">{{ rental.motor_plate }}</p>
        </div>
      </BaseCard>

      <!-- Jadwal Sewa -->
      <BaseCard>
        <h3 class="font-bold mb-4">Jadwal Sewa</h3>
        <div class="flex justify-between items-center relative">
          <div class="absolute top-1/2 left-0 right-0 h-px bg-slate-200 dark:bg-slate-700 -z-10 -translate-y-1/2"></div>
          
          <div class="bg-white dark:bg-slate-800 pr-4">
            <p class="text-xs text-slate-500 font-semibold mb-1">PENGAMBILAN</p>
            <p class="font-bold text-sm">{{ formatDate(rental.start_date) }}</p>
            <p class="text-xs text-slate-500">{{ rental.start_time?.slice(0, 5) || '-' }}</p>
          </div>
          
          <div class="bg-slate-100 dark:bg-slate-700 rounded-full px-3 py-1 border border-slate-200 dark:border-slate-600 text-xs font-semibold z-10">
            {{ rental.package_type }}
          </div>
          
          <div class="bg-white dark:bg-slate-800 pl-4 text-right">
            <p class="text-xs text-slate-500 font-semibold mb-1">PENGEMBALIAN</p>
            <p class="font-bold text-sm">{{ formatDate(rental.end_date) }}</p>
            <p class="text-xs text-slate-500">{{ rental.end_time?.slice(0, 5) || '-' }}</p>
          </div>
        </div>
      </BaseCard>

      <!-- Rincian Biaya -->
      <BaseCard>
        <h3 class="font-bold mb-4">Rincian Pembayaran</h3>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Biaya Sewa</span>
            <span>{{ formatCurrency(rental.subtotal) }}</span>
          </div>
          <div v-if="rental.discount > 0" class="flex justify-between text-emerald-600">
            <span>Diskon Promo</span>
            <span>-{{ formatCurrency(rental.discount) }}</span>
          </div>
          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-base">
            <span>Total Pembayaran</span>
            <span class="text-primary">{{ formatCurrency(rental.total_price) }}</span>
          </div>
        </div>
      </BaseCard>

      <div class="pt-4 space-y-3" v-if="rental.status === 'Awaiting_Payment'">
        <BaseButton class="w-full text-lg shadow-lg shadow-primary/30" @click="$router.push(`/payment/${rental.id}`)">
          Lanjutkan Pembayaran
        </BaseButton>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseBadge from '../components/ui/BaseBadge.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { rentalService } from '../services/rental.service'
import { formatCurrency } from '../utils/formatters'

const route = useRoute()
const rentalId = route.params.id

const rental = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const fetchRental = async () => {
  try {
    const response = await rentalService.getById(rentalId)
    if (response.data.success) {
      rental.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching rental details:', error)
    errorMessage.value = 'Gagal memuat detail pesanan'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRental()
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const formatDateTime = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusVariant = (status) => {
  const map = {
    Pending: 'warning',
    Awaiting_Payment: 'warning',
    Waiting_Verification: 'warning',
    Paid: 'success',
    Ready: 'success',
    Active: 'success',
    Completed: 'success',
    Cancelled: 'danger',
    Expired: 'danger'
  }
  return map[status] || 'default'
}

const formatStatus = (status) => {
  const map = {
    Pending: 'Menunggu',
    Awaiting_Payment: 'Menunggu Pembayaran',
    Waiting_Verification: 'Menunggu Verifikasi',
    Paid: 'Sudah Dibayar',
    Ready: 'Siap Diambil',
    Active: 'Sedang Disewa',
    Completed: 'Selesai',
    Cancelled: 'Dibatalkan',
    Expired: 'Kedaluwarsa'
  }
  return map[status] || status
}
</script>
