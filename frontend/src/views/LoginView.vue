<script setup lang="ts">
import { useAuthForm } from '../composables/useAuthForm'
import AuthInput from '../components/AuthInput.vue'
import SocialButtons from '../components/SocialButtons.vue'

// Business logic handled by /composables/useAuthForm
const { email, password, isSignUp, isLoading, handleSubmit } = useAuthForm()

</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <div class="login-card p-4" style="max-width: 480px; width: 100%;">
      <div class="text-center mb-4">
        <div class="logo mb-3 bg-primary d-inline-block p-3 border rounded-4">
          <i class="fa-solid fa-dumbbell text-white fs-1" style="rotate: 135deg;"></i>
        </div>
        <h1 class="text-white font-weight-bold mb-2">Reps.io</h1>
        <h2 class="text-white mb-2">Welcome back, athlete.</h2>
        <p class="text-info">Enter your details to access your workout logs.</p>
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
          <a href="#" class="text-info text-decoration-none small hover-expand">Forgot Password?</a>
        </div>

        <button
          type="submit"
          class="btn btn-primary btn-lg w-100 py-2 hover-expand"
          :disabled="isLoading"
          style="border: none;"
        >
          <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          {{ isSignUp ? 'Create Account' : 'Sign In' }}
          <i class="bi bi-arrow-right ms-2"></i>
        </button>
      </form>

      <div class="text-center mt-4 mb-3">
        <hr class="border border-info mb-2">
        <span class="text-info small px-2">OR CONTINUE WITH</span>
      </div>

      <SocialButtons />

      <div class="text-center mt-4">
        <p class="text-info mb-0">
          {{ isSignUp ? 'Already have an account?' : 'New to Reps.io?' }} &nbsp;
          <a href="#" @click.prevent="isSignUp = !isSignUp" class="text-primary text-decoration-none hover-expand">
            {{ isSignUp ? 'Sign In' : 'Create Account' }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>