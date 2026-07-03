<template>
  <div :class="[
    'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm',
    paddingClasses[padding]
  ]">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  padding: {
    type: String,
    default: 'md',
    validator: (val) => ['none', 'sm', 'md', 'lg'].includes(val)
  }
})

const paddingClasses = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6'
}
</script>
