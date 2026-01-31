import { ref } from 'vue'
import type { MuscleGroup } from '../types'
import { useRouter } from 'vue-router'

export function useMuscleSelection() {
  const router = useRouter()
  const selectedMuscleId = ref<string | null>(null)

  // TODO: Replace with actual data from backend
  const muscleGroups = ref<MuscleGroup[]>([
    {
      id: 'chest',
      name: 'Chest',
      lastWorkedDays: 3,
      imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'back',
      name: 'Back',
      lastWorkedDays: 5,
      imageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'legs',
      name: 'Legs',
      lastWorkedDays: 7,
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop'
    },
    {
      id: 'arms',
      name: 'Arms',
      lastWorkedDays: 2,
      imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'shoulders',
      name: 'Shoulders',
      lastWorkedDays: 4,
      imageUrl: 'https://images.unsplash.com/photo-1758223520574-a6911a5aa504?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 'core',
      name: 'Core',
      lastWorkedDays: 1,
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'
    }
  ])

  const selectMuscle = (id: string) => {
    selectedMuscleId.value = id
    // Logic to proceed to next step would go here
    // router.push({ name: 'select-exercise', query: { muscle: id } })
    console.log("Selected:", id)
  }

  return {
    muscleGroups,
    selectedMuscleId,
    selectMuscle
  }
}