<script setup lang="ts">
import { useAuthForm } from '../composables/useAuthForm'
import AuthInput from '../components/AuthInput.vue'
import SocialButtons from '../components/SocialButtons.vue'

// Business logic handled by /composables/useAuthForm
const { email, password, isSignUp, errorMessage, isLoading, handleSubmit } = useAuthForm()

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
        <AuthInput 
          v-model="email" 
          label="Email" 
          type="email" 
          placeholder="Enter email address"
          required 
        />

        <AuthInput 
          v-model="password" 
          label="Password" 
          type="password" 
          placeholder="Enter password"
          required 
        />

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

      <SocialButtons />

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