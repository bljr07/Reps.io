<script setup lang="ts">
import CustomBtn from '@/components/ui/CustomBtn.vue'
import CustomFooter from '@/components/layout/CustomFooter.vue'
import { useRestTimer } from '../composables/useRestTimer'

defineEmits(['add-exercise', 'open-timer'])

const { isRestTimerRunning, formattedTime } = useRestTimer()
</script>

<template>
  <CustomFooter>
    <div class="d-flex gap-3 container">
      <CustomBtn variant="secondary" extra-classes="flex-fill fw-bold py-3" element="router-link"
        href="/workout/select-muscle">
        <div class="d-flex align-items-center justify-content-center">
          <span class="material-symbols-outlined me-2">add</span>
          Add Exercise
        </div>
      </CustomBtn>

      <CustomBtn :variant="isRestTimerRunning ? 'primary' : 'secondary'" extra-classes="flex-fill fw-bold py-3"
        @click="$emit('open-timer')">
        <div class="d-flex align-items-center justify-content-center">
          <span class="material-symbols-outlined me-2">timer</span>
          <span v-if="isRestTimerRunning" class="timer-font fs-5 d-flex align-items-center">
            {{ formattedTime.m }}:{{ formattedTime.s }}
          </span>
          <span v-else>Rest Timer</span>
        </div>
      </CustomBtn>
    </div>
  </CustomFooter>
</template>