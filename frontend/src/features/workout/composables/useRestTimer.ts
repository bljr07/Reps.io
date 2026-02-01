import { storeToRefs } from 'pinia'
import { useActiveWorkoutStore } from '../stores/activeWorkout'

export function useRestTimer(defaultSeconds: number = 120) {
  const store = useActiveWorkoutStore()
  const { restTimerSeconds: timeLeft, formattedRestTime: formattedTime, isRestTimerRunning } = storeToRefs(store)
  const { startRestTimer: startTimer, stopRestTimer: stopTimer, addRestTime: addTime, resetRestTimer } = store

  // Wrapper for reset to allow internal component usages that might call it without args
  const reset = (seconds: number = defaultSeconds) => {
    resetRestTimer(seconds)
  }

  // No onUnmounted cleanup here purely because we want persistence.
  // The store handles stopping the timer only when finishWorkout is called.

  return {
    timeLeft,
    formattedTime,
    isRestTimerRunning,
    startTimer,
    stopTimer,
    addTime,
    resetTimer: reset
  }
}
