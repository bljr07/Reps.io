import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createExerciseSchema } from '../schemas/exerciseSchema.js';
import { createCustomExercise } from '../controllers/exerciseController.js';

const router = Router();

router.post(
  '/custom', 
  requireAuth,                    // 1. Check Auth
  validate(createExerciseSchema), // 2. Validate Body
  createCustomExercise            // 3. Run Controller
);
export default router;