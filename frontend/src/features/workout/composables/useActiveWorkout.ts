import { storeToRefs } from 'pinia'
import { useActiveWorkoutStore } from '../stores/activeWorkout'
import type { Exercise } from '../types'
import { ref } from 'vue'

export function useActiveWorkout() {
  const store = useActiveWorkoutStore()
  
  const { exercises } = storeToRefs(store)

  const addExercise = (exercise: Exercise) => {
    store.addExercise(exercise)
  }

  const addSetToExercise = (exerciseId: string) => {
    store.addSetToExercise(exerciseId)
  }

  const showRestTimer = ref(false)

  return {
    exercises,
    showRestTimer,
    addExercise,
    addSetToExercise,
    finishWorkout: store.finishWorkout,
  }
}