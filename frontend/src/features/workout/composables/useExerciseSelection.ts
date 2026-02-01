
import { ref, computed, onMounted } from 'vue' // Added computed
import { useRoute, useRouter } from 'vue-router'
import { workoutService } from '../services/workoutService'
import { useActiveWorkout } from './useActiveWorkout'
import type { Exercise } from '../types'

export function useExerciseSelection() {
  const route = useRoute()
  const router = useRouter()
  const { addExercise } = useActiveWorkout()

  const subMuscleId = route.query.sub as string || ''
  
  // 1. Raw Data (The full list from DB)
  const allExercises = ref<Exercise[]>([])
  
  const searchQuery = ref('')
  const isLoading = ref(true)

  // 2. Computed Property (The filtered list for UI)
  // This runs instantly whenever searchQuery changes
  const filteredExercises = computed(() => {
    if (!searchQuery.value) return allExercises.value

    const query = searchQuery.value.toLowerCase()
    return allExercises.value.filter(ex => 
      ex.name.toLowerCase().includes(query)
    )
  })

  // 3. Fetch once on mount
  const fetchExercises = async () => {
    isLoading.value = true
    allExercises.value = await workoutService.getExercises(subMuscleId)
    isLoading.value = false
  }

  const selectExercise = (exercise: Exercise) => {
    addExercise(exercise)
    router.push({ name: 'active-workout' })
  }

  onMounted(() => {
    fetchExercises()
  })

  return {
    exercises: filteredExercises, 
    searchQuery,
    isLoading,
    selectExercise
  }
}