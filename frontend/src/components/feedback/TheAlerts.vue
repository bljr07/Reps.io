<script setup lang="ts">
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()

// Map alert types to Bootstrap colors
const getTypeClass = (type: string) => {
  switch (type) {
    case 'success': return 'bg-success text-white'
    case 'error': return 'bg-danger text-white'
    case 'warning': return 'bg-warning text-dark'
    default: return 'bg-primary text-white'
  }
}

// Map alert types to Icons
const getIcon = (type: string) => {
  switch (type) {
    case 'success': return 'bi-check-circle-fill'
    case 'error': return 'bi-exclamation-triangle-fill'
    case 'warning': return 'bi-exclamation-circle-fill'
    default: return 'bi-info-circle-fill'
  }
}
</script>

<template>
  <div class="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3" style="z-index: 9999;">
    <TransitionGroup name="toast">
      <div 
        v-for="alert in alertStore.alerts" 
        :key="alert.id"
        class="toast show align-items-center border-0 mb-2 shadow"
        :class="getTypeClass(alert.type)"
        role="alert"
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi" :class="getIcon(alert.type)"></i>
            <span class="fw-medium">{{ alert.message }}</span>
          </div>
          <button 
            type="button" 
            class="btn-close btn-close-white me-2 m-auto" 
            data-bs-dismiss="toast" 
            aria-label="Close"
            @click="alertStore.removeAlert(alert.id)"
          ></button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
/* Custom Vue Transitions for "Fade & Slide" effect */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(30px); /* Slide up from bottom */
}
</style>