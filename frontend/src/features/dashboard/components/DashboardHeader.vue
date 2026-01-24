<script setup lang="ts">
import CustomHeader from '@/components/layout/CustomHeader.vue';

const openSettings = () => {
  console.log("Settings clicked")
}
</script>

<template>
  <CustomHeader>
    <template #title>
      <p class="text-uppercase text-muted fw-bold small mb-0 ls-1">Dashboard</p>
      <h2 class="text-white fw-bold mb-0">Performance Overview</h2>
    </template>

    <template #actions>
      <button class="btn btn-icon rounded-circle" @click="openSettings">
        <span class="material-symbols-outlined text-white">settings</span>
      </button>
    </template>
  </CustomHeader>
</template>

<style scoped>
.ls-1 { letter-spacing: 1px; }
.btn-icon {
  width: 40px; 
  height: 40px; 
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.btn-icon:hover {
  background-color: rgba(255,255,255,0.1);
}
</style>