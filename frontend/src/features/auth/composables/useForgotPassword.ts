import { ref } from 'vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import { useAlertStore } from '@/stores/alert'

export function useForgotPassword() {
  const auth = useAuthStore()
  const alert = useAlertStore()

  const email = ref('')
  const isLoading = ref(false)

  // This function returns a Promise so the UI knows when it finishes
  const submitResetPassword = async (): Promise<boolean> => {
    try {
      isLoading.value = true
      
      await auth.resetPassword(email.value)
      
      alert.showAlert('Password reset email sent! Check your inbox.', 'success')
      
      // Clear form on success
      email.value = ''
      return true // Return true to indicate success
      
    } catch (err: any) {
      alert.showAlert(err.message, 'error')
      return false // Return false to indicate failure
    } finally {
      isLoading.value = false
    }
  }

  return {
    email,
    isLoading,
    submitResetPassword
  }
}