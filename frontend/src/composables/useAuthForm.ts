import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export function useAuthForm() {
  const auth = useAuthStore()
  const router = useRouter()

  const email = ref('')
  const password = ref('')
  const isSignUp = ref(false)
  const errorMessage = ref('')
  const isLoading = ref(false)

  const handleSubmit = async () => {
    try {
      isLoading.value = true
      errorMessage.value = ''

      if (isSignUp.value) {
        await auth.signUp(email.value, password.value)
        alert('Check your email for the confirmation link!')
      } else {
        await auth.signIn(email.value, password.value)
        router.push('/dashboard')
      }
    } catch (err: any) {
      errorMessage.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    email,
    password,
    isSignUp,
    errorMessage,
    isLoading,
    handleSubmit
  }
}