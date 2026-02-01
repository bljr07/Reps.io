import { storeToRefs } from 'pinia'
import { useActiveWorkoutStore } from '../stores/activeWorkout'
import type { Exercise } from '../types'

export function useActiveWorkout() {
  const store = useActiveWorkoutStore()
  
  const { exercises } = storeToRefs(store)

  const addExercise = (exercise: Exercise) => {
    store.addExercise(exercise)
  }

  return {
    exercises,
    addExercise,
    finishWorkout: store.finishWorkout
  }
}