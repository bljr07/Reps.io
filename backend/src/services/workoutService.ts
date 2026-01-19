import { SupabaseClient } from '@supabase/supabase-js';
import type { HistoryQueryDTO, SaveWorkoutDTO } from '../schemas/workoutSchema.js';
import type { Workout } from '../types/workout.types.js';

export class WorkoutService {
  constructor(private supabase: SupabaseClient, private userId: string){}

  async createWorkout(data: SaveWorkoutDTO): Promise< String > {
    let createdWorkoutId: string | null = null;

    try {
      // 1. Create Header
      const { data: workout, error: workoutError } = await this.supabase
        .from('workouts')
        .insert({
          user_id: this.userId,
          name: data.name,
          start_time: data.start_time,
          end_time: data.end_time,
          notes: data.notes
        })
        .select('id')
        .single();

      if (workoutError) throw workoutError;
      createdWorkoutId = workout.id;

      // 2. Prepare Sets
      const setsToInsert = data.sets.map((s) => ({
        workout_id: createdWorkoutId,
        exercise_id: s.exercise_id,
        set_order: s.set_order,
        weight_kg: s.weight_kg,
        reps: s.reps
      }));

      // 3. Insert Sets
      const { error: setsError } = await this.supabase
        .from('workout_sets')
        .insert(setsToInsert);

      if (setsError) throw new Error(`SETS_INSERT_FAILED: ${setsError.message}`);

      return createdWorkoutId!;

    } catch (err: any) {
      // 4. Handle Rollback internally
      if (createdWorkoutId) {
        await this.supabase.from('workouts').delete().eq('id', createdWorkoutId);
      }
      throw err; // Re-throw so the controller knows it failed
    }
  }

  async getHistory(query: HistoryQueryDTO): Promise<{ workouts: Workout[], total: number }> {
    const from = (query.page - 1) * query.limit;
    const to = from + query.limit - 1;

    try {
      const { data, error, count } = await this.supabase
        .from('workouts')
        .select('*', { count: 'exact' })
        .eq('user_id', this.userId) // Explicit security check
        .order('start_time', { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        workouts: data as Workout[],
        total: count || 0
      };
    } catch (err) {
      throw err;
    }
  }
}