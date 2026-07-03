<template>
  <div class="font-display min-h-screen flex justify-center bg-background-dark">
    <!-- Main Splash Container -->
    <div class="relative w-full min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#0a2e7a] via-[#1152d4] to-[#1a64f5] overflow-hidden">

      <!-- Central Logo Section -->
      <div class="flex flex-col items-center justify-center flex-grow z-10">
        <!-- Stylized Motorcycle Icon Container -->
        <div class="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-2xl border border-white/20 cursor-pointer transition-transform active:scale-95" @click="goToLogin">
          <span class="material-icons-round text-white text-6xl">motorcycle</span>
        </div>
        
        <!-- Brand Text -->
        <div class="flex flex-col items-center">
          <h1 class="text-white text-4xl font-extrabold tracking-tight flex items-center">
            Moto<span class="opacity-90">Rent</span>
          </h1>
          <p class="text-white/80 text-xs font-medium tracking-[0.2em] uppercase mt-2">
            Premium Ride Experience
          </p>
        </div>
      </div>

      <!-- Bottom Loading/Action Area -->
      <div class="pb-16 flex flex-col items-center space-y-8 z-10">
        <!-- Subtle Loading Indicator -->
        <div class="flex space-x-1">
          <div class="w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-white opacity-100 animate-pulse delay-75"></div>
          <div class="w-1.5 h-1.5 rounded-full bg-white opacity-40 animate-pulse delay-150"></div>
        </div>
        <p class="text-white/60 text-[10px] font-medium tracking-widest uppercase">
          Version 2.0.4
        </p>
      </div>

      <!-- Decorative Background Element (Subtle Abstract Wave) -->
      <div class="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,224L60,202.7C120,181,240,139,360,138.7C480,139,600,181,720,181.3C840,181,960,139,1080,122.7C1200,107,1320,117,1380,122.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" fill="#ffffff" fill-opacity="1"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

onMounted(() => {
  setTimeout(() => {
    goToLogin()
  }, 3000)
})
</script>
