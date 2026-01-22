<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

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
</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="login-card p-4" style="max-width: 480px; width: 100%;">
      <div class="text-center mb-4">
        <div class="logo mb-3">
          <i class="fa-solid fa-dumbbell" style="font-size: 2rem; color: #ffffff; rotate: 135deg;"></i>
        </div>
        <h1 class="text-white font-weight-bold mb-2">Reps.io</h1>
        <h2 class="text-white mb-2">Welcome back, athlete.</h2>
        <p class="text-muted">Enter your details to access your workout logs.</p>
      </div>

      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="email" class="form-label text-white">Email</label>
          <input
            type="email"
            class="form-control form-control-dark"
            id="email"
            v-model="email"
            placeholder="Enter email address"
            required
          >
        </div>

        <div class="mb-4 position-relative">
          <label for="password" class="form-label text-white">Password</label>
          <input
            type="password"
            class="form-control form-control-dark pe-5"
            id="password"
            v-model="password"
            placeholder="Enter password"
            required
            minlength="6"
          >
          <button type="button" class="btn btn-link text-muted position-absolute top-50 end-0 translate-middle-y text-decoration-none" style="margin-top: 10px;">
            <i class="bi bi-eye-slash-fill"></i>
          </button>
        </div>

        <div class="text-end mb-4">
          <a href="#" class="text-muted text-decoration-none small">Forgot Password?</a>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-lg w-100 py-2"
          :disabled="isLoading"
          style="border: none;"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isSignUp ? 'Create Account' : 'Sign In' }}
          <i class="bi bi-arrow-right ms-2"></i>
        </button>
      </form>

      <div class="text-center mt-4 mb-2">
        <hr class="text-muted" style="border-top: 1px solid #2d3748;">
        <span class="text-muted small px-2 position-relative" style="top: -12px;">OR CONTINUE WITH</span>
      </div>

      <div class="d-flex justify-content-between gap-3">
        <button type="button" class="btn btn-dark flex-fill" style="background: #2d3748; border: 1px solid #3a465b;">
          <i class="bi bi-facebook text-white"></i>
        </button>
        <button type="button" class="btn btn-dark flex-fill" style="background: #2d3748; border: 1px solid #3a465b;">
          <i class="bi bi-google text-white"></i>
        </button>
      </div>

      <div class="text-center mt-4">
        <p class="text-muted mb-0">
          {{ isSignUp ? 'Already have an account?' : 'New to Reps.io?' }}
          <a href="#" @click.prevent="isSignUp = !isSignUp" class="text-primary text-decoration-none">
            {{ isSignUp ? 'Sign In' : 'Sign Up' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: inline-block;
  padding: 15px;
  background: var(--primary);
  border-radius: 12px;
}

.text-muted {
  color: var(--text-muted) !important;
}
</style>