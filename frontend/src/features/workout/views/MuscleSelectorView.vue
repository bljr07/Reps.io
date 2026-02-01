<script setup lang="ts">
import { useMuscleSelection } from '../composables/useMuscleSelection'
import MuscleGroupCard from '../components/MuscleGroupCard.vue'
import WorkoutSelectionLayout from '../components/WorkoutSelectionLayout.vue'

const { muscleGroups, selectedMuscleId, selectMuscle } = useMuscleSelection()
</script>

<template>
  <WorkoutSelectionLayout title="Choose Muscle Group">
    <div class="row g-3">
      <div v-for="muscle in muscleGroups" :key="muscle.id" class="col-6 col-md-4">
        <MuscleGroupCard :muscle="muscle" :is-selected="selectedMuscleId === muscle.id" @select="selectMuscle" />
      </div>
    </div>
  </WorkoutSelectionLayout>
</template>