<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative group">
      <span v-if="leftIcon" class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        {{ leftIcon }}
      </span>
      <input
        :type="type === 'password' && showPassword ? 'text' : type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3.5 focus:ring-2 focus:ring-primary/50 text-sm transition-all outline-none text-slate-900 dark:text-slate-100',
          leftIcon ? 'pl-12' : 'pl-4',
          (rightIcon || type === 'password') ? 'pr-12' : 'pr-4',
          { 'opacity-70 cursor-not-allowed': disabled },
          { 'ring-2 ring-red-500/50 bg-red-50 dark:bg-red-900/20': error }
        ]"
        v-bind="$attrs"
      />
      
      <button 
        v-if="type === 'password'"
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
      >
        <span class="material-icons text-[20px]">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
      </button>

      <span v-else-if="rightIcon" class="material-icons absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
        {{ rightIcon }}
      </span>
    </div>
    <p v-if="error" class="mt-1.5 text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  leftIcon: String,
  rightIcon: String,
  disabled: Boolean,
  required: Boolean,
  error: String
})

defineEmits(['update:modelValue'])

const showPassword = ref(false)
</script>
