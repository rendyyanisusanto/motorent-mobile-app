<template>
  <div :class="[
    'rounded-full overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center',
    sizeClasses[size],
    { 'border-4 border-white dark:border-background-dark shadow-lg': bordered }
  ]">
    <img v-if="src" :src="src" :alt="alt" class="w-full h-full object-cover" />
    <span v-else class="material-icons text-slate-400" :class="iconSizeClasses[size]">person</span>
  </div>
</template>

<script setup>
defineProps({
  src: String,
  alt: {
    type: String,
    default: 'Avatar'
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg', 'xl'].includes(val)
  },
  bordered: {
    type: Boolean,
    default: false
  }
})

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

const iconSizeClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-3xl',
  xl: 'text-5xl'
}
</script>
