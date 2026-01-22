import { defineStore } from 'pinia'
import { ref } from 'vue'

// Define the shape of a single alert
export interface Alert {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // Optional custom duration
}

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<Alert[]>([])

  // Helper to generate unique IDs
  const generateId = () => '_' + Math.random().toString(36).substr(2, 9)

  const removeAlert = (id: string) => {
    alerts.value = alerts.value.filter(alert => alert.id !== id)
  }

  const showAlert = (message: string, type: Alert['type'] = 'info', duration = 3000) => {
    const id = generateId()
    
    // 1. Add to state
    alerts.value.push({ id, message, type, duration })

    // 2. Start the self-destruct timer
    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id)
      }, duration)
    }
  }

  return { alerts, showAlert, removeAlert }
})