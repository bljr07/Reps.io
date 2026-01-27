<script setup lang="ts">
import { useActiveWorkout } from '../composables/useActiveWorkout'

import WorkoutHeader from '../components/WorkoutHeader.vue'
import WorkoutControls from '../components/WorkoutControls.vue'
import ActiveExerciseCard from '../components/ActiveExerciseCard.vue'
import EmptyWorkoutState from '../components/EmptyWorkoutState.vue'

const { exercises, addExercise, addSetToExercise, finishWorkout } = useActiveWorkout()
</script>

<template>
  <div class="container-fluid px-0 pb-5">
    <!-- Header -->
    <WorkoutHeader @finish="finishWorkout" />
  
    <!-- Main Body -->
    <main class="d-flex flex-col px-4 pt-4">
      
      <EmptyWorkoutState v-if="exercises.length === 0" />

      <div v-else>
        <ActiveExerciseCard 
          v-for="ex in exercises" 
          :key="ex.id"
          :exercise="ex"
          @add-set="addSetToExercise(ex.id)"
        />
      </div>

    </main>

    <!-- Footer -->
    <WorkoutControls 
      @add-exercise="addExercise" 
      @open-timer="console.log('Open Timer')" 
    />

  </div>
</template>