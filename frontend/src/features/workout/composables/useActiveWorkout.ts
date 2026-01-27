import { ref } from 'vue'
import type { ActiveExercise, WorkoutSet } from '../types'

const createEmptySet = (setNumber: number): WorkoutSet => ({
    setNumber: setNumber,
    prev: '-', // TODO: You will eventually fetch this from history
    kg: '',
    reps: ''
  })

export function useActiveWorkout() {
  const exercises = ref<ActiveExercise[]>([])

  const addExercise = () => {
    // Mock data for visual representation
    // TODO: Code choosing the exercise and adding the set
    exercises.value.push({
      id: Math.random().toString(36).substr(2, 9), // TODO: Change to id of the exercise from the database
      name: 'Bench Press', // TODO: Change to dynamically update from input parameter
      sets: Array.from({ length: 3 }).map((_, i) => (createEmptySet(i))) // Create set
    })
  }

  const finishWorkout = () => {
    console.log("Finishing workout:", exercises.value)
    // TODO: Connect to API
  }

  // For 'Add Set' btn
  const addSetToExercise = (exerciseId: string) => {
    const exercise = exercises.value.find(e => e.id === exerciseId)
    if (exercise) {
      exercise.sets.push(createEmptySet(exercise.sets.length + 1))
    }
  }

  return {
    exercises,
    addExercise,
    addSetToExercise,
    finishWorkout
  }
}