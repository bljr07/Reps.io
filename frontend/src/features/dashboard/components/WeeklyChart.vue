<script setup lang="ts">
import CustomCard from '@/components/ui/CustomCard.vue'
import type { WeeklyChartData } from '../types';

// Mock data for display purposes
const days: WeeklyChartData[] = [
  { label: 'M', height: '40%', active: false },
  { label: 'T', height: '55%', active: false },
  { label: 'W', height: '85%', active: true }, // Current day
  { label: 'T', height: '30%', active: false },
  { label: 'F', height: '65%', active: false },
  { label: 'S', height: '45%', active: false },
  { label: 'S', height: '20%', active: false },
]
</script>

<template>
  <CustomCard class="d-flex">
    <div class="flex-fill d-flex justify-content-between align-items-end" style="height: 160px;">
      <div 
        v-for="(day, index) in days" 
        :key="index"
        class="d-flex flex-column align-items-center gap-2 h-100"
        style="min-height: 160px; justify-content: flex-end"
      >
        <div class="progress-vertical flex-fill">
          <div 
            class="progress-bar-vertical" 
            role="progressbar"
            :class="day.active ? 'bg-primary shadow-glow' : 'bg-primary-subtle'"
            :style="{ height: day.height }"
          ></div>
        </div>
        
        <span 
          class="small fw-bold"
          :class="day.active ? 'text-white' : 'text-muted'"
        >{{ day.label }}</span>
      </div>
    </div>
  </CustomCard>
</template>

<style scoped>
.shadow-glow {
  box-shadow: 0 0 12px rgba(13, 166, 242, 0.4);
}

.progress-vertical {
  /* Set the container to a specific height and width */
  min-width: 30px;
  /* Use flexbox to align content from bottom to top */
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
  /* Add standard Bootstrap styling for background and border */
  background-color: rgba(0,0,0,0); 
  border-radius: 0.25rem;
  overflow: hidden;
}

.progress-bar-vertical {
  width: 100%;
  transition: height 0.6s ease; 
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 0.25rem;
}
</style>