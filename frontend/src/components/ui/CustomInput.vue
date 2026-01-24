<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string
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
    <input
      :type="inputType"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="form-control form-control-dark border border-info"
      :class="{ 'pe-5': type === 'password' }"
      :placeholder="placeholder"
      :required="required"
    >
    
    <button 
      v-if="type === 'password' && modelValue.length > 0"
      type="button" 
      @click="showPassword = !showPassword"
      class="btn btn-link text-info position-absolute bottom-0 end-0 text-decoration-none pe-3"
    >
      <i :class="showPassword ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill'"></i>
    </button>
  </div>
</template>