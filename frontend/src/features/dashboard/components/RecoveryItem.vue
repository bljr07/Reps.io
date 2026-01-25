<script setup lang="ts">
import { computed } from 'vue'
import CustomCard from '@/components/ui/CustomCard.vue'

const props = defineProps<{
  name: string
  daysAgo: number | null
}>()

// Logic to determine status style
const muscleToIconMap: Record<string, string> = {
    'Chest': 'fitness_center',
    'Legs': 'directions_run',
    'Back': 'accessibility_new',
    'Arms': 'fitness_center',
    'Shoulders': 'accessibility'
  }

const status = computed(() => {
  switch (props.daysAgo) {
    case null:
      return { label: 'No information', color: 'info', icon: 'question' }
    case 1:
      return { label: 'Fatigued', color: 'danger', icon: 'triangle-exclamation' }
    case 2:
      return { label: 'Recovering', color: 'warning', icon: 'battery-half' }
    default:
      return { label: 'Ready', color: 'success', icon: 'check-circle' }
  }
})

// Map muscle names to icons
const getIcon = (name: string) => {
  return muscleToIconMap[name] || 'fitness_center'
}
</script>

<template>
  <CustomCard class="d-flex align-items-center justify-content-between mb-3 cursor-pointer hover-expand limit-scale">
    
    <div class="d-flex align-items-center gap-3">
      <div class="icon-box d-flex align-items-center justify-content-center rounded-3">
        <span class="material-symbols-outlined text-white">{{ getIcon(name) }}</span>
      </div>
      <div>
        <h6 class="mb-0 fw-bold text-white">{{ name }}</h6>
        <small v-if="props.daysAgo" class="text-muted">{{ daysAgo }} days ago</small>
        <small v-else class="text-muted">Time to start!</small>
      </div>
    </div>

    <div class="d-flex align-items-center justify-content-between gap-2 px-2 py-1 rounded-2" 
         :class="`bg-${status.color}-subtle`">
      <i :class="`fa-solid fa-${status.icon} text-${status.color}`"></i>
      <span :class="`text-${status.color}`" class="xs-text fw-bold text-uppercase">{{ status.label }}</span>
    </div>

  </CustomCard>
</template>

<style scoped>
.icon-box {
  width: 48px;
  height: 48px;
}

.status-dot { width: 8px; height: 8px; }
.xs-text { font-size: 0.75rem; letter-spacing: 0.5px; }

.limit-scale:hover {
  /* Override default scaling as width might exceed page */
  transform: scale(1.05);
}
</style>