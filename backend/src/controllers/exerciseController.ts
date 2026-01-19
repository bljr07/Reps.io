import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import { ExerciseService } from '../services/exerciseService.js';
import type { CreateExerciseDTO } from '../schemas/exerciseSchema.js';

export const createCustomExercise = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // 1. Initialize Service with scoped client
    const service = new ExerciseService(req.supabase!, req.user.id);

    // 2. Extract Validated Body 
    const payload = req.body as CreateExerciseDTO;

    // 3. Execute Logic
    const newExercise = await service.createCustomExercise(payload);

    // 4. Return Success
    res.status(201).json({
      success: true,
      exercise: newExercise
    });

  } catch (err: any) {
    // Map Service Errors to HTTP Codes
    const statusCode = err.message.includes("Invalid sub-muscle") ? 400 : 500; // Invalid sub-muscles are thrown from exerciseService
    
    res.status(statusCode).json({ 
      error: true, 
      message: err.message 
    });
  }
};