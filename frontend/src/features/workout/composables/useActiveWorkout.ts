import { ref } from 'vue'
import type { ActiveExercise } from '../types'

export function useActiveWorkout() {
  const exercises = ref<ActiveExercise[]>([])

  const addExercise = () => {
    // Mock data for visual representation
    // TODO: Code choosing the exercise and adding the set
    exercises.value.push({
      id: Math.random().toString(36).substr(2, 9), // TODO: Change to id of the exercise from the database
      name: 'Bench Press',
      sets: Array.from({ length: 3 }).map((_, i) => ({
        id: i,
        prev: '135x10',
        kg: '',
        reps: '',
      }))
    })
  }

  const finishWorkout = () => {
    console.log("Finishing workout:", exercises.value)
    // TODO: Connect to API
  }

  return {
    exercises,
    addExercise,
    finishWorkout
  }
}