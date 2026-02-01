import { supabase } from '@/services/supabase'
import type { SubMuscleGroup } from '../types'

export const workoutService = {
  
  async getSubMuscles(majorMuscleId: string): Promise<SubMuscleGroup[]> {
    const { data, error } = await supabase
      .from('sub_muscles')
      .select('*')
      .eq('group_id', majorMuscleId)
    
    if (error) {
      console.error('Error fetching sub-muscles:', error)
      return []
    }

    return data
  }
}