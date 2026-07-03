<template>
  <AuthLayout>
    <!-- Segmented Control (Tabs) -->
    <div class="px-8 mb-8 mt-4">
      <div class="bg-slate-100 dark:bg-slate-800/80 backdrop-blur-sm p-1 rounded-xl flex shadow-inner">
        <button 
          @click="activeTab = 'login'"
          :class="[
            'flex-1 py-2.5 text-sm transition-all rounded-lg',
            activeTab === 'login' 
              ? 'font-bold bg-white dark:bg-slate-700 shadow-md text-primary scale-[1.02]' 
              : 'font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          ]"
        >
          Log In
        </button>
        <button 
          @click="activeTab = 'register'"
          :class="[
            'flex-1 py-2.5 text-sm transition-all rounded-lg',
            activeTab === 'register' 
              ? 'font-bold bg-white dark:bg-slate-700 shadow-md text-primary scale-[1.02]' 
              : 'font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          ]"
        >
          Register
        </button>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="authStore.error" class="px-8 mb-4">
      <div class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center font-medium">
        {{ authStore.error }}
      </div>
    </div>

    <!-- Content Area: Login -->
    <div v-if="activeTab === 'login'" class="px-8 pb-10 flex flex-col justify-center animate-fade-in">
      <div class="mb-8">
        <h2 class="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Welcome Back!</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Please sign in to continue</p>
      </div>
      
      <!-- Input: Login -->
      <form @submit.prevent="handleLogin" class="space-y-4 mb-6">
        <BaseInput 
          v-model="loginData.email" 
          type="email" 
          left-icon="email" 
          placeholder="Email Address" 
          required
        />
        <BaseInput 
          v-model="loginData.password" 
          type="password" 
          left-icon="lock" 
          placeholder="Password" 
          required
        />
      </form>
      
      <!-- Forgot Password Link -->
      <div class="flex justify-end mb-8">
        <a href="#" class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
          Forgot Password?
        </a>
      </div>
      
      <!-- CTA Button -->
      <BaseButton @click="handleLogin" :disabled="authStore.loading" class="w-full py-4 text-lg shadow-xl shadow-primary/30 active:scale-[0.98] transition-transform">
        {{ authStore.loading ? 'Logging in...' : 'Log In' }}
      </BaseButton>
    </div>

    <!-- Content Area: Register -->
    <div v-else class="px-8 pb-10 animate-fade-in">
      <div class="mb-6">
        <h2 class="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Join MotoRent</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm">Fill in your details to start your journey.</p>
      </div>
      
      <form @submit.prevent="handleRegister" class="space-y-4 mb-6">
        <BaseInput v-model="registerData.full_name" type="text" left-icon="person" placeholder="Full Name" required />
        <BaseInput v-model="registerData.email" type="email" left-icon="email" placeholder="Email Address" required />
        <BaseInput v-model="registerData.phone_number" type="tel" left-icon="phone" placeholder="Phone Number" />
        <!-- Address is no longer handled in basic auth registration backend payload, we could add it later in profile update -->
        <BaseInput v-model="registerData.password" type="password" left-icon="lock" placeholder="Password" required />
      </form>
      
      <div class="flex items-start gap-3 mb-8">
        <input class="mt-1 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-700" type="checkbox" v-model="registerData.agree" required/>
        <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            By creating an account, you agree to our <a class="text-primary font-semibold hover:underline" href="#">Terms of Service</a> and <a class="text-primary font-semibold hover:underline" href="#">Privacy Policy</a>.
        </p>
      </div>
      
      <BaseButton class="w-full py-4 text-lg shadow-xl shadow-primary/30 active:scale-[0.98] transition-transform" @click="handleRegister" :disabled="authStore.loading || !registerData.agree">
        {{ authStore.loading ? 'Creating account...' : 'Create Account' }}
      </BaseButton>
    </div>
  </AuthLayout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AuthLayout from '../components/layout/AuthLayout.vue'
import BaseInput from '../components/ui/BaseInput.vue'
import BaseButton from '../components/ui/BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('login')

// Clear error when switching tabs
watch(activeTab, () => {
  authStore.error = null
})

const loginData = ref({
  email: '',
  password: ''
})

const registerData = ref({
  full_name: '',
  email: '',
  phone_number: '',
  password: '',
  agree: false
})

const handleLogin = async () => {
  if (!loginData.value.email || !loginData.value.password) return
  
  const result = await authStore.login(loginData.value.email, loginData.value.password)
  if (result.success) {
    router.push('/home')
  }
}

const handleRegister = async () => {
  if (!registerData.value.agree || !registerData.value.email || !registerData.value.password || !registerData.value.full_name) return
  
  const result = await authStore.register({
    email: registerData.value.email,
    password: registerData.value.password,
    full_name: registerData.value.full_name,
    phone_number: registerData.value.phone_number
  })
  
  if (result.success) {
    // Automatically login after successful registration
    const loginResult = await authStore.login(registerData.value.email, registerData.value.password)
    if (loginResult.success) {
      router.push('/home')
    } else {
      activeTab.value = 'login'
    }
  }
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
