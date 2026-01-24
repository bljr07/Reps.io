<script setup lang="ts">
import RecoveryItem from './RecoveryItem.vue'
import type { RecoveryStat } from '../types'

defineProps<{
  isLoading: boolean
  stats: RecoveryStat[]
}>()
</script>

<template>
  <section class="pb-5">
    <h4 class="text-white fw-bold mb-1">Muscle Recovery</h4>
    <p class="text-muted small mb-3">Based on your training history</p>

    <div v-if="isLoading" class="text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else-if="stats.length === 0" class="text-center py-5 text-muted">
      <p>No workouts found yet.</p>
    </div>

    <div v-else>
      <RecoveryItem 
        v-for="stat in stats" 
        :key="stat.muscle_group_name"
        :name="stat.muscle_group_name"
        :days-ago="stat.days_since_last_workout"
      />
    </div>
  </section>
</template>