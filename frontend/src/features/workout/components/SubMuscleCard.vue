<script setup lang="ts">
import type { SubMuscleGroup } from '../types'
import CustomCard from '@/components/ui/CustomCard.vue'


defineProps<{
  item: SubMuscleGroup
}>()
</script>

<template>
  <CustomCard
    class="hover-expand w-100"
    @click="$emit('select', item.id)"
  >
    <h6 class="text-white fw-bold">
      {{ item.name }}
    </h6>
  </CustomCard>
</template>