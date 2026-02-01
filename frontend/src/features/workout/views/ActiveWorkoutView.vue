<script setup lang="ts">
import { useActiveWorkout } from '../composables/useActiveWorkout'

import WorkoutHeader from '../components/WorkoutHeader.vue'
import WorkoutControls from '../components/WorkoutControls.vue'
import ActiveExerciseCard from '../components/ActiveExerciseCard.vue'
import EmptyWorkoutState from '../components/EmptyWorkoutState.vue'
import RestTimerOverlay from '../components/RestTimerOverlay.vue'

const { exercises, showRestTimer, addExercise, addSetToExercise, finishWorkout } = useActiveWorkout()
</script>

<template>
  <div class="container-fluid px-0 pb-5">
    <!-- Header -->
    <WorkoutHeader @finish="finishWorkout" />

    <!-- Main Body -->
    <main class="d-flex flex-col mt-4 container">

      <EmptyWorkoutState v-if="exercises.length === 0" />

      <div v-else>
        <ActiveExerciseCard v-for="ex in exercises" :key="ex.id" :exercise="ex" @add-set="addSetToExercise(ex.id)" />
      </div>

    </main>

    <!-- Footer -->
    <WorkoutControls @add-exercise="addExercise" @open-timer="showRestTimer = true" />

    <RestTimerOverlay v-model="showRestTimer" @skip="showRestTimer = false" />

  </div>
</template>