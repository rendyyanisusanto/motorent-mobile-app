<template>
  <AppLayout>
    <div class="px-6 pt-12 pb-6 flex items-center gap-4 bg-white dark:bg-slate-950 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800">
      <button @click="$router.back()" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span class="material-icons">arrow_back</span>
      </button>
      <h1 class="text-xl font-bold">Form Booking</h1>
    </div>
    
    <div class="px-6 space-y-6 pt-4">
      <!-- Informasi Motor -->
      <BaseCard class="flex gap-4 items-center">
        <div class="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
          <img :src="motorImageUrl" :alt="motor?.name" class="w-full h-full object-cover" />
        </div>
        <div>
          <h3 class="font-bold text-lg">{{ motor?.name }}</h3>
          <p class="text-sm text-slate-500 font-semibold">{{ formatCurrency(motor?.price_per_day || motor?.pricePerDay || 0) }} <span class="font-normal text-xs">/ hari</span></p>
        </div>
      </BaseCard>

      <!-- Paket Sewa -->
      <BaseCard>
        <h3 class="font-bold mb-4">Paket Sewa</h3>
        <div class="grid grid-cols-2 gap-3">
          <button 
            v-for="pkg in ['Harian', 'Mingguan', 'Bulanan']" 
            :key="pkg"
            @click="form.paket = pkg"
            :class="['p-3 rounded-xl border text-sm font-semibold transition-all', form.paket === pkg ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400']"
          >
            {{ pkg }}
          </button>
        </div>
      </BaseCard>

      <!-- Waktu Sewa -->
      <BaseCard>
        <h3 class="font-bold mb-4">Waktu Sewa</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <BaseInput v-model="form.tanggalMulai" label="Tanggal Mulai" type="date" />
            <BaseInput v-model="form.jamMulai" label="Jam Mulai" type="time" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <BaseInput v-model="form.tanggalSelesai" label="Tanggal Selesai" type="date" />
            <BaseInput v-model="form.jamSelesai" label="Jam Selesai" type="time" />
          </div>
          
          <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl flex justify-between items-center border border-slate-100 dark:border-slate-800">
            <span class="text-sm font-semibold text-slate-500">Estimasi Durasi</span>
            <span class="font-bold text-primary">{{ computedDuration }}</span>
          </div>
        </div>
      </BaseCard>

      <!-- Informasi Penyewa -->
      <BaseCard>
        <h3 class="font-bold mb-4">Informasi Penyewa</h3>
        <div class="space-y-4">
          <BaseInput v-model="form.nama" label="Nama Lengkap" placeholder="Sesuai KTP" />
          <BaseInput v-model="form.email" label="Email" placeholder="alamat@email.com" type="email" />
          <BaseInput v-model="form.telepon" label="Nomor Telepon" placeholder="08xxx" type="tel" />
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tujuan Penggunaan</label>
            <select v-model="form.tujuan" class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/50 text-sm outline-none text-slate-900 dark:text-slate-100 appearance-none">
              <option value="" disabled>Pilih Tujuan</option>
              <option value="Liburan/Wisata">Liburan/Wisata</option>
              <option value="Perjalanan Bisnis">Perjalanan Bisnis</option>
              <option value="Operasional Sehari-hari">Operasional Sehari-hari</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
        </div>
      </BaseCard>

      <!-- Dokumen Persyaratan -->
      <BaseCard>
        <h3 class="font-bold mb-1">Dokumen Persyaratan</h3>
        <p class="text-xs text-slate-500 mb-4">Pastikan foto terlihat jelas dan tidak buram.</p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Foto KTP</label>
            <div class="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden group cursor-pointer">
              <input type="file" class="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" @change="handleFile($event, 'ktp')" />
              <div v-if="files.ktp" class="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <span class="material-icons text-primary text-3xl">check_circle</span>
              </div>
              <span class="material-icons text-slate-400 text-3xl mb-2">badge</span>
              <p class="text-xs font-semibold text-slate-500">{{ files.ktp ? 'KTP Terunggah' : 'Ketuk untuk upload KTP' }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Foto SIM C</label>
            <div class="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden group cursor-pointer">
              <input type="file" class="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" @change="handleFile($event, 'sim')" />
              <div v-if="files.sim" class="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <span class="material-icons text-primary text-3xl">check_circle</span>
              </div>
              <span class="material-icons text-slate-400 text-3xl mb-2">credit_card</span>
              <p class="text-xs font-semibold text-slate-500">{{ files.sim ? 'SIM Terunggah' : 'Ketuk untuk upload SIM' }}</p>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Catatan Tambahan -->
      <BaseCard>
        <h3 class="font-bold mb-4">Catatan Tambahan (Opsional)</h3>
        <textarea 
          v-model="form.catatan" 
          rows="3" 
          placeholder="Ada request khusus? (contoh: minta helm ukuran XL)"
          class="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-primary/50 text-sm outline-none text-slate-900 dark:text-slate-100 resize-none"
        ></textarea>
      </BaseCard>
      
      <div class="pb-24 pt-4">
        <div class="mb-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl flex justify-between items-center border border-slate-100 dark:border-slate-800">
          <span class="text-sm font-semibold text-slate-500">Total Pembayaran</span>
          <span class="font-bold text-xl text-primary">{{ formatCurrency(computedTotal) }}</span>
        </div>

        <div v-if="errorMessage" class="mb-4 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-100">
          {{ errorMessage }}
        </div>
        <BaseButton class="w-full text-lg shadow-lg shadow-primary/30" @click="submitBooking" :disabled="isSubmitting || !files.ktp || !files.sim">
          {{ isSubmitting ? 'Memproses...' : 'Lanjut ke Pembayaran' }}
        </BaseButton>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, reactive, onMounted, markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { useMotorStore } from '../stores/motorStore'
import { formatCurrency } from '../utils/formatters'
import { rentalService } from '../services/rental.service'
import dummyMotor from '../assets/dummy_motor.png'

const route = useRoute()
const router = useRouter()
const motorId = route.params.id

const motorStore = useMotorStore()
const motor = computed(() => motorStore.getMotorById(motorId))

const motorImageUrl = computed(() => {
  if (motor.value?.images && motor.value.images.length > 0) return motor.value.images[0].url || motor.value.images[0];
  if (motor.value?.image) return motor.value.image;
  return dummyMotor;
})

onMounted(() => {
  if (motorStore.motors.length === 0) {
    motorStore.fetchMotors()
  }
})

const isSubmitting = ref(false)
const errorMessage = ref('')

const form = reactive({
  paket: 'Harian',
  tanggalMulai: '',
  jamMulai: '08:00',
  tanggalSelesai: '',
  jamSelesai: '08:00',
  nama: '',
  email: '',
  telepon: '',
  tujuan: '',
  catatan: ''
})

const files = reactive({
  ktp: null,
  sim: null
})

const handleFile = (event, type) => {
  const file = event.target.files[0]
  if (file) {
    files[type] = markRaw(file)
  }
}

// Dummy calculation logic for duration
const computedDuration = computed(() => {
  if (!form.tanggalMulai || !form.tanggalSelesai) return '-'
  
  const start = new Date(`${form.tanggalMulai}T${form.jamMulai || '00:00'}`)
  const end = new Date(`${form.tanggalSelesai}T${form.jamSelesai || '00:00'}`)
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '-'
  
  const diffMs = end - start
  if (diffMs <= 0) return 'Waktu tidak valid'
  
  const diffHours = diffMs / (1000 * 60 * 60)
  
  if (form.paket === 'Harian') {
    return `${Math.ceil(diffHours / 24)} Hari`
  } else if (form.paket === 'Mingguan') {
    return `${Math.ceil(diffHours / (24 * 7))} Minggu`
  } else if (form.paket === 'Bulanan') {
    return `${Math.ceil(diffHours / (24 * 30))} Bulan`
  }
  
  return '-'
})

const computedTotal = computed(() => {
  if (!form.tanggalMulai || !form.tanggalSelesai) return 0
  
  const start = new Date(`${form.tanggalMulai}T${form.jamMulai || '00:00'}`)
  const end = new Date(`${form.tanggalSelesai}T${form.jamSelesai || '00:00'}`)
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0
  
  const diffMs = end - start
  if (diffMs <= 0) return 0
  
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  const price = motor.value?.price_per_day || motor.value?.pricePerDay || 0
  
  return diffDays * price
})

const submitBooking = async () => {
  if (!form.tanggalMulai || !form.tanggalSelesai || !files.ktp || !files.sim || !form.tujuan) {
    errorMessage.value = 'Mohon lengkapi semua data dan dokumen persyaratan'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('motorcycle_id', motorId)
    formData.append('package_type', form.paket)
    formData.append('start_date', form.tanggalMulai)
    formData.append('start_time', form.jamMulai)
    formData.append('end_date', form.tanggalSelesai)
    formData.append('end_time', form.jamSelesai)
    formData.append('usage_purpose', form.tujuan)
    if (form.catatan) formData.append('notes', form.catatan)
    
    formData.append('ktp', files.ktp)
    formData.append('sim', files.sim)

    const response = await rentalService.createRental(formData)
    if (response.data.success) {
      const rentalId = response.data.data.id
      router.push(`/payment/${rentalId}`)
    }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || 'Terjadi kesalahan saat memproses booking'
    console.error(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>
