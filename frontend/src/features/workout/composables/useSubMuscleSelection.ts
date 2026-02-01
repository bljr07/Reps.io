
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { workoutService } from '../services/workoutService'
import type { SubMuscleGroup } from '../types'

export function useSubMuscleSelection() {
  const route = useRoute()
  const router = useRouter()
  
  const majorMuscleId = route.query.muscle_group as string || 'chest'
  const subMuscles = ref<SubMuscleGroup[]>([])
  const isLoading = ref(true)

  // Capitalize for display (e.g., "chest" -> "Chest")
  // TODO: Use name from Muscle Selection instead
  const muscleNameDisplay = majorMuscleId.charAt(0).toUpperCase() + majorMuscleId.slice(1)

  const fetchSubMuscles = async () => {
    isLoading.value = true
    subMuscles.value = await workoutService.getSubMuscles(majorMuscleId)
    isLoading.value = false
  }

  const selectSubMuscle = (subMuscle: SubMuscleGroup) => {
    console.log("Selected Sub Muscle:", subMuscle.name)
    // Next Step: Go to Exercise Selection
    // router.push({ name: 'select-sub-muscle', query: { muscle: majorMuscleId } })
  }

  onMounted(() => {
    fetchSubMuscles()
  })

  return {
    majorMuscleId,
    muscleNameDisplay,
    subMuscles,
    isLoading,
    selectSubMuscle
  }
}