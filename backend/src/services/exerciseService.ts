import { SupabaseClient } from '@supabase/supabase-js';
import type { CreateExerciseDTO } from '../schemas/exerciseSchema.js';
import type { Exercise } from '../types/exercise.types.js';

export class ExerciseService {
  constructor(private supabase: SupabaseClient, private userId: string) {}

  async createCustomExercise(data: CreateExerciseDTO): Promise<Exercise> {
    try {
      // 1. Insert the new exercise
      // We force 'created_by_user_id' to be the current user for security
      const { data: exercise, error } = await this.supabase
        .from('exercises')
        .insert({
          name: data.name,
          sub_muscle_id: data.sub_muscle_id,
          equipment: data.equipment,
          created_by_user_id: this.userId
        })
        .select('*')
        .single();

      if (error) {
        // Handle specific DB errors (e.g., Foreign Key violation if sub_muscle_id is invalid)
        if (error.code === '23503') { // PostgreSQL code for FK violation
          throw new Error(`Invalid sub-muscle ID: ${data.sub_muscle_id}`);
        } else {
          throw error;
        }
      }

      return exercise as Exercise;

    } catch (err: any) {
      // Clean up the error message for the controller
      throw new Error(`Failed to create exercise: ${err.message}`);
    }
  }
}