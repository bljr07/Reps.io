<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { Modal } from 'bootstrap'
import { useForgotPassword } from '../composables/useForgotPassword'
import AuthInput from '@/components/ui/AuthInput.vue'

const props = defineProps<{
  isForgetPassword: boolean
}>()

// Emits
const emit = defineEmits(['closeModal'])

// Importing business logic from useForgotPassword.ts
const { email, isLoading, submitResetPassword } = useForgotPassword()

// Data
const modalRef = ref<HTMLElement | null>(null)
let modalInstance: Modal | null = null

onMounted(() => {
  if (modalRef.value) {
    // Initialize Bootstrap Modal
    modalInstance = new Modal(modalRef.value)

    // Listen for the native bootstrap hidden event to sync state with parent
    modalRef.value.addEventListener('hidden.bs.modal', () => {
      emit('closeModal')
    })
  }
})

onBeforeUnmount(() => {
  // Clean up to prevent memory leaks
  if (modalInstance) {
    modalInstance.dispose()
  }
})

// Watch prop to toggle modal visibility
watch(() => props.isForgetPassword, (newVal) => {
  if (newVal) {
    modalInstance?.show()
  } else {
    modalInstance?.hide()
  }
})

// 4. Handle Submission
const handleFormSubmit = async () => {
  // Call the business logic
  const success = await submitResetPassword()
  
  // Only close the modal if the logic succeeded
  if (success) {
    emit('closeModal')
  }
}
</script>

<template>
  <div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-hidden="true" ref="modalRef">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark border mb-3" style="border-color: var(--border-color);">
        
        <!-- Header -->
        <div class="modal-header border-bottom border-secondary">
          <h5 class="modal-title text-white">Reset Password</h5>
          <button type="button" class="btn-close btn-close-white" @click="$emit('closeModal')"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <p class="text-info small mb-3">
            Enter your email address and we'll send you a magic link to reset your password.
          </p>
          
          <form @submit.prevent="handleFormSubmit">
            <AuthInput 
              v-model="email" 
              label="Email Address" 
              type="email" 
              placeholder="name@example.com" 
              required 
            />

            <!-- Submit btn -->
            <div class="d-grid mt-4">
              <button type="submit" class="btn btn-primary hover-expand" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>