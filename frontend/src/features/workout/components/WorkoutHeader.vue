<script setup lang="ts">
import CustomHeader from '@/components/layout/CustomHeader.vue'
import CustomBtn from '@/components/ui/CustomBtn.vue'
import WorkoutTimer from './WorkoutTimer.vue'

defineEmits(['finish'])
</script>

<template>
  <CustomHeader>
    <template #title>
      <WorkoutTimer />
    </template>
    <template #actions>
      <CustomBtn 
        variant="primary" 
        :block="false" 
        extra-classes="px-4 shadow-sm text-white fw-bold"
        @click="$emit('finish')"
      >
        Finish
      </CustomBtn>
    </template>
  </CustomHeader>
</template>