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

  /* Rest Timer Logic */
  const restTimerSeconds = ref(120)
  const isRestTimerRunning = ref(false)
  let restTimerInterval: number | null = null

  // Computed for formatting (optional, but convenient)
  const formattedRestTime = computed(() => {
    const m = Math.floor(restTimerSeconds.value / 60)
    const s = restTimerSeconds.value % 60
    return {
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0')
    }
  })

  const startRestTimer = () => {
    if (isRestTimerRunning.value && restTimerInterval) return

    isRestTimerRunning.value = true
    if (restTimerInterval) clearInterval(restTimerInterval)
    restTimerInterval = setInterval(() => {
      if (restTimerSeconds.value > 0) {
        restTimerSeconds.value--
      } else {
        stopRestTimer()
      }
    }, 1000)
  }

  const stopRestTimer = () => {
    if (restTimerInterval) {
      clearInterval(restTimerInterval)
      restTimerInterval = null
    }
    isRestTimerRunning.value = false
  }

  const addRestTime = (seconds: number) => {
    restTimerSeconds.value = Math.max(0, restTimerSeconds.value + seconds)
  }

  const resetRestTimer = (seconds: number = 120) => {
    restTimerSeconds.value = seconds
  }

  const finishWorkout = () => {
    console.log("Saving Workout:", exercises.value)
    exercises.value = []
    startTime.value = null
    stopRestTimer()
    resetRestTimer(120)
  }

  return {
    exercises,
    startTime,
    restTimerSeconds,
    isRestTimerRunning,
    formattedRestTime,
    startWorkout,
    addExercise,
    addSetToExercise,
    finishWorkout,
    startRestTimer,
    stopRestTimer,
    addRestTime,
    resetRestTimer
  }
})