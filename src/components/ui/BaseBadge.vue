<template>
  <span :class="[
    'text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap',
    variantClasses[variant]
  ]">
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (val) => ['success', 'warning', 'danger', 'info', 'default'].includes(val)
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
    case 'warning':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
    case 'danger':
      return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
    case 'info':
      return 'bg-primary/10 dark:bg-primary/20 text-primary'
    case 'default':
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
  }
})
</script>
