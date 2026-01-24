<script setup lang="ts">
import CustomCard from '@/components/ui/CustomCard.vue';

defineProps<{
  label: string
  value: string | number
  icon: string
  iconColor?: string // e.g., 'text-warning'
  unit?: string   // e.g., 'lbs'
}>()
</script>

<template>
  <CustomCard class="h-100 d-flex flex-column justify-content-center">
    <div class="d-flex align-items-center gap-2 mb-1">
      <span class="material-symbols-outlined" :class="iconColor || 'text-primary'">{{ icon }}</span>
      <span class="text-muted small fw-bold">{{ label }}</span>
    </div>
    <h3 class="fw-bold text-white mb-0">
      {{ value }} 
      <span v-if="unit" class="fs-6 fw-normal text-muted">{{ unit }}</span>
    </h3>
  </CustomCard>
</template>