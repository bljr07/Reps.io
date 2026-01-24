import { ref } from 'vue'
import { useAuthStore } from '@/features/auth/stores/auth'
import { useAlertStore } from '@/stores/alert'
import { useRouter } from 'vue-router'

export function useAuthForm() {
  const auth = useAuthStore()
  const router = useRouter()
  const alert = useAlertStore()

  const email = ref('')
  const password = ref('')
  const isSignUp = ref(false)
  const isLoading = ref(false)
  const isForgetPassword = ref(false)

  const handleSubmit = async () => {
    try {
      isLoading.value = true

      if (isSignUp.value) {
        await auth.signUp(email.value, password.value)
        alert.showAlert('Check your email for the confirmation link!', 'success')
        password.value = ''
        isSignUp.value = false
      } else {
        await auth.signIn(email.value, password.value)
        router.push('/dashboard')
      }
    } catch (err: any) {
      alert.showAlert(err.message, 'error')
    } finally {
      isLoading.value = false
    }
  }

  const handleForgetSubmit = () => {
    isForgetPassword.value = true
  }

  return {
    email,
    password,
    isSignUp,
    isLoading,
    isForgetPassword,
    handleSubmit,
    handleForgetSubmit
  }
}