<script setup lang="ts">
import { useAuthForm } from '../composables/useAuthForm'
import CustomInput from '@/components/ui/CustomInput.vue'
import SocialSection from '@/components/ui/SocialSection.vue'
import AsyncButton from '@/components/ui/AsyncButton.vue'
import AppLogo from '@/components/ui/AppLogo.vue'
import AppTitle from '@/components/ui/AppTitle.vue'
import ForgotPasswordModal from '../components/ForgotPasswordModal.vue'

// Business logic handled by /composables/useAuthForm
const { email, password, isSignUp, isLoading, isForgetPassword, handleSubmit, handleForgetSubmit } = useAuthForm()

</script>

<template>
  <div class="d-flex justify-content-center align-items-center min-vh-100">
    <!-- Main div -->
    <div class="p-4" style="max-width: 576px; width: 100%;">
      <!-- Header Section -->
      <div class="text-center mb-4">
        <AppLogo />
        <AppTitle />
        <h2 class="text-white mb-2">Welcome back, athlete.</h2>
        <p class="text-info">Enter your details to access your workout logs.</p>
      </div>
      
      <!-- Auth Form -->
      <form @submit.prevent="handleSubmit">
        <label class="form-label text-white">Email</label>
        <CustomInput 
          v-model="email" 
          type="email" 
          placeholder="Enter email address"
          required 
        />

        <label class="form-label text-white">Password</label>
        <CustomInput 
          v-model="password" 
          type="password" 
          placeholder="Enter password"
          required 
        />

        <div class="text-end mb-4">
          <a 
            class="text-info text-decoration-none small hover-expand"
            @click="handleForgetSubmit"
            >
            Forgot Password?
          </a>
        </div>

        <AsyncButton type="submit" :loading="isLoading">
          {{ isSignUp ? 'Create Account' : 'Sign In' }}
          <i class="bi bi-arrow-right"></i>
        </AsyncButton>
      </form>

      <!-- Socials -->
      <SocialSection />

      <!-- Sign In / Create Account -->
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

  <!-- Forgot Password Modal -->
  <ForgotPasswordModal 
    :isForgetPassword="isForgetPassword"
    @close-modal="isForgetPassword=false"
    />
</template>