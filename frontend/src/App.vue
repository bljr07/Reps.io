<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useAuthStore } from './stores/auth'
import { useRouter, RouterView, useRoute } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  auth.initialize()
})

// Watcher: Runs exactly once when 'loading' flips from true -> false
watch(() => auth.loading, (isLoading) => {
  if (!isLoading) {
    // Auth check is done. Now we strictly enforce redirects.
    
    // Case 1: User is NOT logged in, but tries to access hidden page
    if (route.meta.requiresAuth && !auth.user) {
      router.push('/login')
    }
    
    // Case 2: User IS logged in, but sits on Login page
    if (route.meta.requiresGuest && auth.user) {
      router.push('/dashboard')
    }
  }
})
</script>

<template>
  <!-- Spinner while loading -->
  <div v-if="auth.loading" class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="text-center">
      <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;"></div>
      <p class="text-muted">Loading Reps.io...</p>
    </div>
  </div>

  <!-- Main Webpage -->
  <RouterView v-else />
</template>