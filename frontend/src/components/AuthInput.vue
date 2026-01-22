<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

// Local state for password visibility toggle
const showPassword = ref(false)

// Dynamically determine the input type
const inputType = computed(() => {
  if (props.type === 'password' && showPassword.value) return 'text'
  return props.type || 'text'
})
</script>

<template>
  <div class="mb-3 position-relative">
    <label class="form-label text-white">{{ label }}</label>
    <input
      :type="inputType"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="form-control form-control-dark"
      :class="{ 'pe-5': type === 'password' }"
      :placeholder="placeholder"
      :required="required"
    >
    
    <button 
      v-if="type === 'password'"
      type="button" 
      @click="showPassword = !showPassword"
      class="btn btn-link text-muted position-absolute bottom-0 end-0 text-decoration-none pe-3 pb-2"
    >
      <i :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>
    </button>
  </div>
</template>