<template>
  <AppLayout>
    <div class="px-6 pt-12 pb-6">
      <h1 class="text-2xl font-bold tracking-tight">Riwayat Transaksi</h1>
      <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Daftar penyewaan motor Anda.</p>
    </div>
    
    <div class="px-6 space-y-4">
      <div v-if="isLoading" class="flex justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
      <div v-else-if="rentals.length === 0" class="text-center py-12">
        <span class="material-icons text-4xl text-slate-300 dark:text-slate-600 mb-2">history</span>
        <p class="text-sm text-slate-500">Belum ada riwayat transaksi.</p>
      </div>
      <BaseCard v-else v-for="rental in rentals" :key="rental.id" class="flex flex-col gap-3">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-bold">Booking #{{ rental.booking_code }}</h4>
            <p class="text-xs text-slate-500 mt-1">{{ formatDate(rental.start_date) }} - {{ formatDate(rental.end_date) }}</p>
          </div>
          <BaseBadge :variant="getStatusVariant(rental.status)">{{ formatStatus(rental.status) }}</BaseBadge>
        </div>
        <hr class="border-slate-100 dark:border-slate-700" />
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <img v-if="rental.motorcycle?.images?.[0]?.url" :src="rental.motorcycle.images[0].url" :alt="rental.motor_name" class="w-full h-full object-cover" />
            <img v-else src="../assets/dummy_motor.png" :alt="rental.motor_name" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-semibold">{{ rental.motor_name }}</p>
            <p class="text-primary font-bold text-xs mt-1">{{ formatCurrency(rental.total_price) }}</p>
          </div>
          <div>
            <BaseButton v-if="rental.status === 'Awaiting_Payment'" size="sm" variant="outline" @click="$router.push(`/payment/${rental.id}`)">
              Bayar
            </BaseButton>
            <BaseButton v-else size="sm" variant="outline" @click="$router.push(`/history/${rental.id}`)">
              Detail
            </BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseBadge from '../components/ui/BaseBadge.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { rentalService } from '../services/rental.service'
import { formatCurrency } from '../utils/formatters'

const router = useRouter()
const rentals = ref([])
const isLoading = ref(true)

const fetchRentals = async () => {
  try {
    const response = await rentalService.getMyRentals()
    if (response.data.success) {
      rentals.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching rentals:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRentals()
})

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
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
