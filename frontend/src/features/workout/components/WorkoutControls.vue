<script setup lang="ts">
import CustomBtn from '@/components/ui/CustomBtn.vue'
import CustomFooter from '@/components/layout/CustomFooter.vue'

defineEmits(['add-exercise', 'open-timer'])
</script>

<template>
  <CustomFooter>
    <div class="d-flex gap-3 container">
      <CustomBtn variant="secondary" extra-classes="flex-fill fw-bold py-3" element="router-link"
        href="/workout/select-muscle">
        <span class="material-symbols-outlined me-2">add</span>
        Add Exercise
      </CustomBtn>

      <CustomBtn variant="secondary" extra-classes="flex-fill fw-bold py-3" @click="$emit('open-timer')">
        <span class="material-symbols-outlined me-2">timer</span>
        Rest Timer
      </CustomBtn>
    </div>
  </CustomFooter>
</template>