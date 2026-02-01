import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ActiveExercise, Exercise, WorkoutSet } from '../types'

const createEmptySet = (setNumber: number): WorkoutSet => ({
    setNumber: setNumber,
    prev: '-',
    kg: '',
    reps: ''
  })

export const useActiveWorkoutStore = defineStore('activeWorkout', () => {
  const exercises = ref<ActiveExercise[]>([])
  const startTime = ref<number | null>(null)

  const startWorkout = () => {
    if (!startTime.value) {
      startTime.value = Date.now()
    }
  }

  const addExercise = (exercise: Exercise) => {
      exercises.value.push({
        id: exercise.id,
        name: exercise.name,
        sets: Array.from({ length: 3 }).map((_, i) => (createEmptySet(i)))
      })
    }

  const addSetToExercise = (exerciseId: string) => {
    const exercise = exercises.value.find(e => e.id === exerciseId)
    if (exercise) {
      exercise.sets.push(createEmptySet(exercise.sets.length + 1))
    }
  }

  const finishWorkout = () => {
    console.log("Saving Workout:", exercises.value)
    exercises.value = []
    startTime.value = null
  }

  return {
    exercises,
    startTime,
    startWorkout,
    addExercise,
    addSetToExercise,
    finishWorkout
  }
})