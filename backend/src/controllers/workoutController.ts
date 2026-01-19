import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import { WorkoutService } from '../services/workoutService.js';
import type { SaveWorkoutDTO, HistoryQueryDTO } from '../schemas/workoutSchema.js';

export const saveWorkout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // 1. Initialize Service
    const service = new WorkoutService(req.supabase!, req.user.id);
    // 2. Parse Body
    const payload = req.body as SaveWorkoutDTO;
    // 3. Call Service
    const workoutId = await service.createWorkout(payload);

    // 4. Send Response (Success)
    res.status(200).json({ success: true, workout_id: workoutId });
  } catch (err: any) {
    // Send Failed Response (Main job of controller)
    res.status(500).json({ error: true, message: err.message });
  }
};

// --- Get History Logic ---
export const getHistory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // 1. Initialize Service
    const service = new WorkoutService(req.supabase!, req.user.id);

    // 2. Parse Query Params (Typesafe thanks to Zod coercion in middleware)
    // Note: We cast to unknown first because Express query types are tricky
    const query = req.query as unknown as HistoryQueryDTO;

    // 3. Call Service
    const result = await service.getHistory(query);

    // 4. Send Response
    res.status(200).json({
      success: true,
      page: query.page,
      limit: query.limit,
      total: result.total,
      data: result.workouts
    });

  } catch (err: any) {
    res.status(500).json({ error: true, code: 'DB_READ_ERROR', message: err.message });
  }
};