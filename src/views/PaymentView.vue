<template>
  <AppLayout>
    <div class="px-6 pt-12 pb-6 flex items-center gap-4 bg-white dark:bg-slate-950 sticky top-0 z-20 border-b border-slate-100 dark:border-slate-800">
      <button @click="$router.back()" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <span class="material-icons">arrow_back</span>
      </button>
      <h1 class="text-xl font-bold">Pembayaran</h1>
    </div>
    
    <div class="px-6 space-y-6 pt-4 pb-24">
      <div v-if="isLoading" class="flex justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
      <template v-else>
        <BaseCard>
          <h3 class="font-bold mb-2">Total Pembayaran</h3>
          <p class="text-3xl font-black text-primary">{{ formatCurrency(rentalData?.total_price || 0) }}</p>
          <p class="text-xs text-slate-500 mt-1">Harap transfer sesuai dengan nominal di atas.</p>
        </BaseCard>

        <BaseCard>
          <h3 class="font-bold mb-4">Pilih Metode Pembayaran</h3>
          <div class="space-y-3">
            <label v-for="method in paymentMethods" :key="method.id" class="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:border-slate-700">
              <input type="radio" name="payment" :value="method.id" v-model="selectedMethodId" class="text-primary focus:ring-primary" />
              <div class="flex flex-col">
                <span class="font-medium text-sm">{{ method.name }}</span>
                <span class="text-xs text-slate-500" v-if="method.account_number">{{ method.account_number }} a/n {{ method.account_name }}</span>
                <span class="text-xs text-slate-500" v-else>Bayar di lokasi</span>
              </div>
            </label>
          </div>
        </BaseCard>

        <BaseCard>
          <h3 class="font-bold mb-1">Upload Bukti Bayar</h3>
          <p class="text-xs text-slate-500 mb-4">Pastikan nominal dan tanggal terlihat jelas.</p>
          
          <div class="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden group cursor-pointer transition-colors hover:border-primary">
            <input type="file" class="absolute inset-0 opacity-0 cursor-pointer z-10" accept="image/*" @change="handleFile" />
            <div v-if="receiptFile" class="absolute inset-0 bg-primary/20 flex flex-col items-center justify-center z-0">
              <span class="material-icons text-primary text-4xl mb-2">check_circle</span>
              <span class="text-primary font-bold text-sm">Bukti Terunggah</span>
            </div>
            <template v-else>
              <span class="material-icons text-slate-400 text-4xl mb-3 group-hover:text-primary transition-colors">receipt_long</span>
              <p class="text-sm font-semibold text-slate-600 dark:text-slate-300">Ketuk untuk unggah gambar</p>
              <p class="text-xs text-slate-400 mt-1">Format: JPG, PNG (Max. 5MB)</p>
            </template>
          </div>
        </BaseCard>
        
        <div class="pt-4">
          <div v-if="errorMessage" class="mb-4 p-3 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-100">
            {{ errorMessage }}
          </div>
          <BaseButton class="w-full text-lg shadow-lg shadow-primary/30" :disabled="!receiptFile || !selectedMethodId || isSubmitting" @click="handleConfirm">
            {{ isSubmitting ? 'Memproses...' : 'Konfirmasi & Bayar' }}
          </BaseButton>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import BaseCard from '../components/ui/BaseCard.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import { formatCurrency } from '../utils/formatters'
import { rentalService } from '../services/rental.service'
import { paymentService } from '../services/payment.service'

const router = useRouter()
const route = useRoute()
const rentalId = route.params.id

const receiptFile = ref(null)
const rentalData = ref(null)
const paymentMethods = ref([])
const selectedMethodId = ref('')
const isLoading = ref(true)
const isSubmitting = ref(false)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const [rentalRes, methodsRes] = await Promise.all([
      rentalService.getById(rentalId),
      paymentService.getMethods()
    ])
    
    if (rentalRes.data.success) {
      rentalData.value = rentalRes.data.data
    }
    
    if (methodsRes.data.success) {
      paymentMethods.value = methodsRes.data.data
      if (paymentMethods.value.length > 0) {
        selectedMethodId.value = paymentMethods.value[0].id
      }
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Gagal memuat rincian pembayaran'
  } finally {
    isLoading.value = false
  }
})

const handleFile = (event) => {
  const file = event.target.files[0]
  if (file) {
    receiptFile.value = markRaw(file)
  }
}

const handleConfirm = async () => {
  if (!receiptFile.value || !selectedMethodId.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('payment_method_id', selectedMethodId.value)
    formData.append('receipt', receiptFile.value)

    const response = await paymentService.confirmPayment(rentalId, formData)
    
    if (response.data.success) {
      router.push('/history')
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = err.response?.data?.message || 'Terjadi kesalahan saat mengunggah bukti pembayaran'
  } finally {
    isSubmitting.value = false
  }
}
</script>
