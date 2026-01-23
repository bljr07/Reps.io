<script setup lang="ts">
import { computed } from 'vue'

// 
const muscleToIconMap: Record<string, string> = {
    'Chest': 'fitness_center',
    'Legs': 'directions_run',
    'Back': 'accessibility_new',
    'Arms': 'fitness_center',
    'Shoulders': 'accessibility'
  }

const props = defineProps<{
  name: string
  daysAgo: number | null
}>()

// Logic to determine status style
const status = computed(() => {
  switch (props.daysAgo) {
    case null:
      return { label: 'No information', color: 'info', icon: 'check_circle' }
    case 1:
      return { label: 'Fatigued', color: 'danger', icon: 'battery_alert' }
    case 2:
      return { label: 'Recovering', color: 'warning', icon: 'schedule' }
    default:
      return { label: 'Ready', color: 'success', icon: 'check_circle' }
  }
})

// Map muscle names to icons
const getIcon = (name: string) => {
  return muscleToIconMap[name] || 'fitness_center'
}
</script>

<template>
  <div class="card-custom d-flex align-items-center justify-content-between mb-3 cursor-pointer">
    
    <div class="d-flex align-items-center gap-3">
      <div class="icon-box d-flex align-items-center justify-content-center rounded-3">
        <span class="material-symbols-outlined text-white">{{ getIcon(name) }}</span>
      </div>
      <div>
        <h6 class="mb-0 fw-bold text-white">{{ name }}</h6>
        <small class="text-muted">{{ daysAgo }} days ago</small>
      </div>
    </div>

    <div class="d-flex align-items-center gap-2 px-2 py-1 rounded-2" 
         :class="`bg-${status.color}-subtle`">
      <div class="status-dot rounded-circle" :class="`bg-${status.color}`"></div>
      <span :class="`text-${status.color}`" class="xs-text fw-bold text-uppercase">{{ status.label }}</span>
    </div>

  </div>
</template>

<style scoped>
.icon-box {
  width: 48px;
  height: 48px;
}
.bg-success-subtle { background-color: rgba(25, 135, 84, 0.2); }
.bg-warning-subtle { background-color: rgba(255, 193, 7, 0.2); }
.bg-danger-subtle { background-color: rgba(220, 53, 69, 0.2); }

.status-dot { width: 8px; height: 8px; }
.xs-text { font-size: 0.75rem; letter-spacing: 0.5px; }
.cursor-pointer { cursor: pointer; transition: transform 0.1s; }
.cursor-pointer:active { transform: scale(0.98); }
</style>