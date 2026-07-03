<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-bold transition-colors focus:outline-none',
      sizeClasses[size],
      variantClasses,
      { 'opacity-70 cursor-not-allowed': disabled || loading },
      { 'cursor-wait': loading }
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <span v-if="loading" class="material-icons animate-spin mr-2 text-[1em]">autorenew</span>
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline', 'danger', 'icon'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'icon'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const sizeClasses = {
  sm: 'text-xs px-3 py-1.5 rounded-lg',
  md: 'text-sm px-4 py-3 rounded-xl',
  lg: 'text-base px-6 py-4 rounded-xl',
  icon: 'p-2 rounded-full'
}

const variantClasses = computed(() => {
  if (props.disabled && props.variant !== 'icon') {
    return 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
  }
  
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80 shadow-sm shadow-primary/30'
    case 'secondary':
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 dark:active:bg-slate-600'
    case 'outline':
      return 'bg-transparent border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
    case 'danger':
      return 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-500/30'
    case 'icon':
      return 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center'
    default:
      return ''
  }
})
</script>
