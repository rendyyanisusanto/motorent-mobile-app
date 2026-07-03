<template>
  <div :class="[
    'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 flex gap-4 shadow-sm',
    { 'opacity-80': motor.status === 'Servis' }
  ]">
    <div :class="[
      'w-32 h-32 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0',
      { 'filter grayscale': motor.status === 'Servis' }
    ]">
      <img class="w-full h-full object-cover" :src="motorImageUrl" :alt="motor.name" />
    </div>
    
    <div class="flex flex-col justify-between flex-1 py-1">
      <div>
        <div class="flex justify-between items-start gap-2">
          <h4 class="font-bold text-slate-800 dark:text-white leading-tight">{{ motor.name }}</h4>
          <BaseBadge :variant="statusVariant">{{ displayStatus }}</BaseBadge>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-xs mt-1">
          {{ motor.type }} &bull; {{ motor.year }} &bull; {{ motor.cc }}
        </p>
      </div>
      
      <div class="flex items-center justify-between mt-2">
        <div>
          <p class="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Harga</p>
          <p class="text-primary font-bold text-sm">
            {{ formatCurrencyShort(motorPrice) }}<span class="text-slate-400 font-normal">/hari</span>
          </p>
        </div>
        
        <BaseButton 
          :disabled="!isAvailable" 
          size="sm"
          @click="$emit('book', motor)"
        >
          {{ isAvailable ? 'Booking' : 'Tidak Tersedia' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseBadge from './BaseBadge.vue'
import BaseButton from './BaseButton.vue'
import { formatCurrencyShort } from '../../utils/formatters'
import dummyMotor from '../../assets/dummy_motor.png'

const props = defineProps({
  motor: {
    type: Object,
    required: true
  }
})

defineEmits(['book'])

const isAvailable = computed(() => {
  return props.motor.status === 'Tersedia' || props.motor.status === 'Available'
})

const motorPrice = computed(() => {
  return props.motor.price_per_day || props.motor.pricePerDay || 0
})

const motorImageUrl = computed(() => {
  if (props.motor.images && props.motor.images.length > 0) {
    return props.motor.images[0].url || props.motor.images[0]
  }
  return props.motor.image || dummyMotor
})

const displayStatus = computed(() => {
  const s = props.motor.status
  if (s === 'Available') return 'Tersedia'
  if (s === 'Rented') return 'Disewa'
  if (s === 'Maintenance') return 'Servis'
  return s
})

const statusVariant = computed(() => {
  const s = props.motor.status
  switch (s) {
    case 'Tersedia': 
    case 'Available': 
      return 'success'
    case 'Disewa': 
    case 'Rented': 
      return 'warning'
    case 'Servis': 
    case 'Maintenance': 
      return 'danger'
    default: 
      return 'default'
  }
})
</script>
