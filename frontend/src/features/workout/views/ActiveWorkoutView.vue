<script setup lang="ts">
import { ref } from 'vue'
import WorkoutTimer from '../components/WorkoutTimer.vue'
import ActiveExerciseCard from '../components/ActiveExerciseCard.vue'

// State
const exercises = ref<any[]>([]) // Start empty to show empty state

// Logic to add a dummy exercise (for demo purposes)
const addExercise = () => {
  exercises.value.push({ name: 'Bench Press', sets: 3 })
}
</script>

<template>
  <div class="container-fluid px-0 pb-5">
  <div>

    <header class="border-bottom sticky-top px-3 py-3 d-flex justify-content-between align-items-center z-3">
      <WorkoutTimer />
      <button class="btn btn-primary fw-bold px-4 shadow-sm hover-expand text-white">
        Finish
      </button>
    </header>
  </div>
  
  <main class="d-flex flex-col px-4 pt-4">
      
      <div v-if="exercises.length === 0" class="d-flex flex-column align-items-center justify-content-center h-100">
        <div class="card-custom border-secondary border-3 w-100 p-4 d-flex flex-column align-items-center text-center" style="border-style: dashed;">
          
          <div class="rounded-circle d-flex align-items-center justify-content-center mb-3" 
               style="width: 80px; height: 80px; background: rgba(13, 166, 242, 0.1);">
            <span class="material-symbols-outlined text-primary" style="font-size: 40px;">fitness_center</span>
          </div>

          <h5 class="text-white fw-bold mb-2">No exercises added yet</h5>
          <p class="text-info small mb-4">
            Your workout is empty. Tap the button below to start logging your sets.
          </p>

        </div>
      </div>

      <div v-else>
        <ActiveExerciseCard 
          v-for="(ex, index) in exercises" 
          :key="index"
          :exercise-name="ex.name"
          :sets="ex.sets"
        />
      </div>


    </main>
  <footer class="fixed-bottom p-3 z-3 border-top bg-footer"> 
    <div class="d-flex gap-3">
      
      <button @click="addExercise" class="btn btn-secondary flex-fill hover-expand fw-bold d-flex align-items-center justify-content-center gap-2 py-3">
        <span class="material-symbols-outlined">add</span>
        Add Exercise
      </button>

      <button class="btn btn-secondary flex-fill hover-expand fw-bold d-flex align-items-center justify-content-center gap-2 py-3">
          <span class="material-symbols-outlined">timer</span>
          Rest Timer
      </button>

    </div>
  </footer>
  </div>
</template>

<style scoped>

.hover-lift {
  transition: transform 0.2s, background-color 0.2s;
}
.hover-lift:active {
  transform: scale(0.98);
}
</style>