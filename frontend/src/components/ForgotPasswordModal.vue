<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useAlertStore } from '../stores/alert'
import AuthInput from './AuthInput.vue'
import { Modal } from 'bootstrap'

const auth = useAuthStore()
const alert = useAlertStore()

const email = ref('')
const isLoading = ref(false)
const modalRef = ref<HTMLElement | null>(null)
const modalInstance = computed(() => modalRef.value ? new Modal(modalRef.value) : null)

// Props
const props = defineProps<{
  isForgetPassword: boolean
}>()

// Emits
const emit = defineEmits(['closeModal'])

// Watch to toggle the modal
watch(() => props.isForgetPassword, () => {
  if (props.isForgetPassword && modalInstance.value){
    modalInstance.value.show()
  } else if (modalInstance.value){
    modalInstance.value.hide()
  }
})

// Handling when the reset button is clicked
// 1. Send the request to Supabase
// 2. Show success alert
// 3. Close the Modal
const handleReset = async () => {
  try {
    isLoading.value = true
    await auth.resetPassword(email.value)

    alert.showAlert('Password reset email sent! Check your inbox.', 'success')
    email.value = ''
    emit('closeModal')

  } catch (err: any) {
    alert.showAlert(err.message, 'error')
  } finally {
    isLoading.value = false
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
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" @click="$emit('closeModal')"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <p class="text-info small mb-3">
            Enter your email address and we'll send you a magic link to reset your password.
          </p>
          
          <!-- Email form -->
          <form @submit.prevent="handleReset">
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