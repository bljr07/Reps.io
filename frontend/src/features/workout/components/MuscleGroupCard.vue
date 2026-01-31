<script setup lang="ts">
import type { MuscleGroup } from '../types'
import CustomCard from '@/components/ui/CustomCard.vue';

defineProps<{
  muscle: MuscleGroup
  isSelected: boolean
}>()

defineEmits(['select'])
</script>

<template>
  <CustomCard
    :no-padding="true"
    :class="{ 'border-primary': isSelected}"
    class="overflow-hidden hover-expand w-100"
    @click="$emit('select', muscle.id)"
  >
    <div 
      class="img-container bg-secondary position-relative"
      :style="{ backgroundImage: `url(${muscle.imageUrl})` }"
    >
      <div class="gradient-overlay"></div>
    </div>

    <div class="p-3">
      <h6 class="text-white fw-bold mb-2" :class="{ 'text-primary': isSelected }">
        {{ muscle.name }}
      </h6>
      <p class="text-primary xs-text fw-bold mb-0">
        {{ muscle.lastWorkedDays }} days since last worked
      </p>
    </div>
  </CustomCard>
</template>

<style scoped>
/* Image styling */
.img-container {
  width: 100%;
  aspect-ratio: 4/3;
  background-size: cover;
  background-position: center;
}

/* Gradient overlay to make text readable (though text is below image here, nice to have depth) */
.gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}

.xs-text {
  font-size: 11px;
}
</style>