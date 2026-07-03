<template>
  <AppLayout>
    <div class="w-full min-h-screen relative bg-white dark:bg-slate-950 flex flex-col font-display pb-20">
      
      <!-- Header Overlay -->
      <div class="fixed top-0 left-0 right-0 z-20 px-6 pt-12 pb-4 flex justify-between items-center pointer-events-none max-w-md mx-auto">
        <button @click="goBack" class="pointer-events-auto w-10 h-10 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-95 transition-transform">
          <span class="material-icons text-slate-900 dark:text-white">arrow_back_ios_new</span>
        </button>
        <div class="flex gap-2 pointer-events-auto">
          <button class="w-10 h-10 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-95 transition-transform">
            <span class="material-icons text-slate-900 dark:text-white">share</span>
          </button>
          <button class="w-10 h-10 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md flex items-center justify-center shadow-sm active:scale-95 transition-transform">
            <span class="material-icons text-rose-500">favorite</span>
          </button>
        </div>
      </div>
      
      <!-- Main Content (Scrollable) -->
      <div class="flex-1 overflow-y-auto hide-scrollbar">
        <!-- Image Slider Section -->
        <div class="relative w-full aspect-[4/3] bg-slate-200 dark:bg-slate-800 group">
          <div ref="sliderRef" class="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full scroll-smooth" @scroll="handleScroll">
            <div v-for="(img, idx) in motorImages" :key="idx" class="min-w-full h-full snap-center flex-shrink-0">
              <img :src="img" :alt="motor?.name" class="w-full h-full object-cover pointer-events-none" />
            </div>
          </div>
          
          <!-- Navigation Arrows (Desktop) -->
          <button @click="scrollPrev" class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/50 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" :disabled="activeImageIndex === 0">
            <span class="material-icons text-sm text-slate-900">chevron_left</span>
          </button>
          <button @click="scrollNext" class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/50 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0" :disabled="activeImageIndex === motorImages.length - 1">
            <span class="material-icons text-sm text-slate-900">chevron_right</span>
          </button>

          <!-- Pagination Dots -->
          <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            <button 
              v-for="(_, idx) in motorImages" 
              :key="idx" 
              @click="scrollTo(idx)"
              :class="['w-2 h-2 rounded-full transition-all', activeImageIndex === idx ? 'bg-primary scale-125' : 'bg-white/70']"
            ></button>
          </div>
        </div>
        
        <!-- Detail Information -->
        <div class="px-6 pt-6 space-y-6 pb-32">
          <!-- Title & Rating -->
          <div class="space-y-1">
            <div class="flex justify-between items-start">
              <h1 class="text-3xl font-bold tracking-tight">{{ motor?.name }}</h1>
            </div>
            <div class="flex items-center gap-1">
              <div class="flex text-amber-400">
                <span class="material-icons text-[18px]">star</span>
                <span class="material-icons text-[18px]">star</span>
                <span class="material-icons text-[18px]">star</span>
                <span class="material-icons text-[18px]">star</span>
                <span class="material-icons text-[18px]">star_half</span>
              </div>
              <span class="text-sm font-semibold text-slate-600 dark:text-slate-400 ml-1">{{ motor?.rating || '4.8' }}</span>
              <span class="text-xs text-slate-400 dark:text-slate-500">({{ motor?.reviews || '124' }} Reviews)</span>
            </div>
          </div>
          
          <!-- Specs Grid -->
          <div class="grid grid-cols-3 gap-3">
            <div class="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2 border border-slate-100 dark:border-slate-800">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="material-icons text-primary text-xl">settings</span>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Engine</p>
                <p class="text-sm font-bold">{{ motor?.cc }}</p>
              </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2 border border-slate-100 dark:border-slate-800">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="material-icons text-primary text-xl">event</span>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Year</p>
                <p class="text-sm font-bold">{{ motor?.year }}</p>
              </div>
            </div>
            <div class="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl flex flex-col items-center justify-center text-center space-y-2 border border-slate-100 dark:border-slate-800">
              <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span class="material-icons text-primary text-xl">bolt</span>
              </div>
              <div>
                <p class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Type</p>
                <p class="text-sm font-bold">{{ motor?.type }}</p>
              </div>
            </div>
          </div>
          
          <!-- Pricing Section -->
          <div class="space-y-3">
            <h2 class="text-lg font-bold">Rental Rate</h2>
            <div class="p-4 rounded-xl border-2 border-primary/20 bg-primary/5 flex justify-between items-center">
              <div>
                <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Daily Rate</p>
                <p class="text-[10px] text-slate-400 mt-1">Insurance included</p>
              </div>
              <div class="text-right">
                <span class="text-xl font-black text-primary">{{ formatCurrency(motor?.price_per_day || motor?.pricePerDay || 0) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Description -->
          <div class="space-y-3">
            <h2 class="text-lg font-bold">Overview</h2>
            <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {{ motor?.description || 'Nikmati performa mesin yang legendaris dengan handling yang lincah. Cocok untuk penggunaan dalam kota maupun perjalanan jauh di akhir pekan. Motor ini baru saja di-servis dan dalam kondisi prima untuk petualangan Anda.' }}
            </p>
          </div>
          
          <!-- Features List -->
          <div class="space-y-3">
            <h2 class="text-lg font-bold">What's Included</h2>
            <div class="grid grid-cols-2 gap-y-3">
              <div class="flex items-center gap-2">
                <span class="material-icons text-green-500 text-[18px]">check_circle</span>
                <span class="text-xs text-slate-700 dark:text-slate-300">2 Helm Full Face</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-icons text-green-500 text-[18px]">check_circle</span>
                <span class="text-xs text-slate-700 dark:text-slate-300">Jas Hujan</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-icons text-green-500 text-[18px]">check_circle</span>
                <span class="text-xs text-slate-700 dark:text-slate-300">Full Tank BBM</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="material-icons text-green-500 text-[18px]">check_circle</span>
                <span class="text-xs text-slate-700 dark:text-slate-300">Asuransi Trip</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Fixed Bottom Action Bar -->
      <div class="fixed bottom-[72px] left-0 right-0 p-6 pt-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 z-30 max-w-md mx-auto">
        <div class="flex items-center gap-4 mb-4">
          <div class="flex-1">
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estimated Total</p>
            <p class="text-xl font-black text-slate-900 dark:text-white">{{ formatCurrency(motor?.price_per_day || motor?.pricePerDay || 0) }} <span class="text-xs font-normal text-slate-500">/ hari</span></p>
          </div>
        </div>
        <button @click="goToBooking" :disabled="!isAvailable" :class="['w-full font-bold py-4 rounded-xl shadow-lg transition-transform flex items-center justify-center gap-2', isAvailable ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/25 active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none']">
          <span>{{ isAvailable ? 'Booking Sekarang' : 'Tidak Tersedia' }}</span>
          <span v-if="isAvailable" class="material-icons text-[20px]">arrow_forward</span>
        </button>
      </div>
      
    </div>
  </AppLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppLayout from '../components/layout/AppLayout.vue'
import { useMotorStore } from '../stores/motorStore'
import { formatCurrency } from '../utils/formatters'
import dummyMotor from '../assets/dummy_motor.png'

const route = useRoute()
const router = useRouter()
const motorStore = useMotorStore()

const sliderRef = ref(null)
const activeImageIndex = ref(0)

const motorId = route.params.id
const motor = computed(() => motorStore.getMotorById(motorId))

const motorImages = computed(() => {
  if (motor.value?.images && motor.value.images.length > 0) return motor.value.images;
  if (motor.value?.image) return [motor.value.image];
  return [dummyMotor];
})

const isAvailable = computed(() => {
  return motor.value?.status === 'Tersedia' || motor.value?.status === 'Available'
})

const handleScroll = () => {
  if (!sliderRef.value) return
  const scrollLeft = sliderRef.value.scrollLeft
  const width = sliderRef.value.clientWidth
  activeImageIndex.value = Math.round(scrollLeft / width)
}

const scrollTo = (index) => {
  if (!sliderRef.value) return
  const width = sliderRef.value.clientWidth
  sliderRef.value.scrollTo({
    left: width * index,
    behavior: 'smooth'
  })
}

const scrollPrev = () => {
  if (activeImageIndex.value > 0) scrollTo(activeImageIndex.value - 1)
}

const scrollNext = () => {
  const maxIdx = motorImages.value.length - 1
  if (activeImageIndex.value < maxIdx) scrollTo(activeImageIndex.value + 1)
}

const goBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    router.push('/home')
  }
}

const goToBooking = () => {
  router.push(`/booking/${motor.value?.id}`)
}
</script>
