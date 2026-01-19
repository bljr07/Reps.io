import { Router } from 'express';
import { saveWorkout, getHistory } from '../controllers/workoutController.js';
import { requireAuth } from '../middleware/auth.js';
import { saveWorkoutSchema, historyQuerySchema } from '../schemas/workoutSchema.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// All routes here are protected (Validate authentication -> Validate payload -> Perform database query)
router.post('/finish', requireAuth, validate(saveWorkoutSchema), saveWorkout);
router.get('/history', requireAuth, validate(historyQuerySchema, 'query'), getHistory);

export default router;