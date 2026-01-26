<script setup lang="ts">
import CustomCard from '@/components/ui/CustomCard.vue'
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center h-100">
    <CustomCard class="border-secondary border-3 w-100 p-4 d-flex flex-column align-items-center text-center dashed-border">
      
      <div class="rounded-circle d-flex align-items-center justify-content-center mb-3 icon-circle">
        <span class="material-symbols-outlined text-primary display-3" >fitness_center</span>
      </div>

      <h5 class="text-white fw-bold mb-2">No exercises added yet</h5>
      <p class="text-info small mb-4">
        Your workout is empty. Tap the button below to start logging your sets.
      </p>

    </CustomCard>
  </div>
</template>

<style scoped>
.dashed-border { border-style: dashed !important; }
.icon-circle { width: 80px; height: 80px; background: rgba(13, 166, 242, 0.1); }
</style>