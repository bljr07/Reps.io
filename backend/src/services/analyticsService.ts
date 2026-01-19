import { SupabaseClient } from '@supabase/supabase-js';
import type { RecoveryStat } from '../types/analytics.types.js';

export class AnalyticsService {
  constructor(private supabase: SupabaseClient, private userId: string) {}

  async getMuscleRecoveryStats(): Promise<RecoveryStat[]> {
    try {
      // Query the specific view we created in setup.sql
      // RLS (Row Level Security) automatically filters by the current user
      const { data, error } = await this.supabase
        .from('v_muscle_recovery')
        .select('*');

      if (error) throw error;

      // Cast the result to our strict type
      return data as RecoveryStat[];

    } catch (err: any) {
      throw new Error(`Failed to fetch recovery stats: ${err.message}`);
    }
  }
}