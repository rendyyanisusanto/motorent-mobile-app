<template>
  <AppLayout>
    <!-- Header -->
    <header class="px-6 py-4 flex items-center justify-between">
      <div>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Selamat pagi,</p>
        <h1 class="text-xl font-bold">{{ authStore.user?.profile?.full_name || authStore.user?.email || 'Pengguna' }} 👋</h1>
      </div>
      <button @click="$router.push('/notifications')" class="relative w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
        <span class="material-icons text-primary text-xl">notifications</span>
        <span class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-background-dark rounded-full"></span>
      </button>
    </header>

    <!-- Search Bar -->
    <div class="px-6 py-2">
      <BaseInput v-model="searchQuery" left-icon="search" right-icon="tune" placeholder="Cari motor..." />
    </div>

    <!-- Promo Banner Carousel -->
    <div class="mt-6">
      <div ref="sliderRef" class="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 gap-4 scroll-smooth">
        <div class="min-w-[320px] h-44 rounded-xl relative overflow-hidden flex-shrink-0 snap-center">
          <img class="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcnX--yHKzngMeKJdFEv_98G3BxhGKDVpp2TB3_YJwNnejkl4HlJWPrjSTwq9nbqJZOYSUzG3KxBNg4MfRB02UvcCkT_pEAMgNR-BZDWc6xXIDd24ndJZKsPtdEs9TQdKIXyBVLcIPk8ldzY5w3_T32oAwxFyndRAdOt1vl2DzL1OlGSySMC_zRymBsGrxtzsv7ROzePclZ4KrcJoru-IBAPlThaSdCiVAGkG7td7XEQrSnu3UbmLAV-pML7q7Ji-hNKdFXyQov5ae" alt="Promo 1"/>
          <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6">
            <span class="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full w-max mb-2">NEW ARRIVAL</span>
            <h2 class="text-white text-xl font-bold">Nikmati Diskon<br/>Akhir Pekan 20%</h2>
            <p class="text-white/80 text-xs mt-1">Gunakan kode: GASKAN20</p>
          </div>
        </div>
        <div class="min-w-[320px] h-44 rounded-xl relative overflow-hidden flex-shrink-0 snap-center">
          <img class="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzs3VieCdfIFsH8nGohMcZ6aFlAvShTyzP8MnQo8JM6vrJSaJfDWSYnChSgo0vrcFksbRQNyjxCRG5MCwYjqJyPHpANjGcitKUj6f-07CxgU2ETI199HuoUM8GuXImteNeYoZlof4GvgAmqi3T-4u3yK5EDTh1D4wIJfyejQSrc92Dq4V8sBEGcLDdNaJGLb957wT-TnhsFfHQHU4qfSNqqZYIaYaD-iRmxbRVA1vvU94B-lEKc2k1LVel3ru-JRrrQAh-5iFeJOS_" alt="Promo 2"/>
          <div class="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex flex-col justify-center px-6">
            <h2 class="text-white text-xl font-bold">Siap Touring?<br/>Paket Adventure</h2>
            <p class="text-white/80 text-xs mt-1">Mulai dari Rp 350rb/hari</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <div class="mt-8 px-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-lg">Kategori</h3>
        <button @click="$router.push('/motors')" class="text-primary text-xs font-semibold hover:underline">Lihat Semua</button>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <button @click="toggleCategory('Matic')" class="flex flex-col items-center gap-2 group outline-none">
          <div :class="['w-14 h-14 rounded-xl flex items-center justify-center transition-colors', selectedCategory === 'Matic' ? 'bg-primary/10 dark:bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200']">
            <span class="material-icons">electric_moped</span>
          </div>
          <span :class="['text-xs font-medium', selectedCategory === 'Matic' ? 'text-primary' : '']">Matic</span>
        </button>
        <button @click="toggleCategory('Manual')" class="flex flex-col items-center gap-2 group outline-none">
          <div :class="['w-14 h-14 rounded-xl flex items-center justify-center transition-colors', selectedCategory === 'Manual' ? 'bg-primary/10 dark:bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200']">
            <span class="material-icons">settings_input_component</span>
          </div>
          <span :class="['text-xs font-medium', selectedCategory === 'Manual' ? 'text-primary' : '']">Manual</span>
        </button>
        <button @click="toggleCategory('Sport')" class="flex flex-col items-center gap-2 group outline-none">
          <div :class="['w-14 h-14 rounded-xl flex items-center justify-center transition-colors', selectedCategory === 'Sport' ? 'bg-primary/10 dark:bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200']">
            <span class="material-icons">speed</span>
          </div>
          <span :class="['text-xs font-medium', selectedCategory === 'Sport' ? 'text-primary' : '']">Sport</span>
        </button>
        <button @click="toggleCategory('Touring')" class="flex flex-col items-center gap-2 group outline-none">
          <div :class="['w-14 h-14 rounded-xl flex items-center justify-center transition-colors', selectedCategory === 'Touring' ? 'bg-primary/10 dark:bg-primary/20 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200']">
            <span class="material-icons">terrain</span>
          </div>
          <span :class="['text-xs font-medium', selectedCategory === 'Touring' ? 'text-primary' : '']">Touring</span>
        </button>
      </div>
    </div>

    <!-- Inventory List -->
    <div class="mt-8 px-6 pb-24">
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-lg">Motor Tersedia</h3>
        <span class="material-icons text-slate-400">sort</span>
      </div>
      <div v-if="filteredMotors.length > 0" class="space-y-4">
        <CardMotor 
          v-for="motor in filteredMotors" 
          :key="motor.id" 
          :motor="motor" 
          @book="handleBooking"
        />
      </div>
      <div v-else class="text-center py-8 bg-slate-50 dark:bg-slate-800 rounded-xl">
        <p class="text-slate-500 text-sm">Tidak ada motor yang sesuai filter.</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import CardMotor from '../components/ui/CardMotor.vue'
import { useMotorStore } from '../stores/motorStore'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const motorStore = useMotorStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const selectedCategory = ref(null)
const sliderRef = ref(null)
let autoScrollInterval = null

const toggleCategory = (category) => {
  if (selectedCategory.value === category) {
    selectedCategory.value = null
  } else {
    selectedCategory.value = category
  }
}

const filteredMotors = computed(() => {
  let result = motorStore.motors
  
  if (selectedCategory.value) {
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

onMounted(() => {
  // Fetch motors from API
  motorStore.fetchMotors()

  // Auto-scroll logic
  if (sliderRef.value) {
    autoScrollInterval = setInterval(() => {
      if (!sliderRef.value) return
      
      const el = sliderRef.value
      const maxScrollLeft = el.scrollWidth - el.clientWidth
      
      if (el.scrollLeft >= maxScrollLeft - 10) {
        // go back to start
        el.scrollLeft = 0
      } else {
        // scroll right
        el.scrollLeft += 336 // approx card width + gap
      }
    }, 3000)
  }
})

onUnmounted(() => {
  if (autoScrollInterval) clearInterval(autoScrollInterval)
})
</script>
