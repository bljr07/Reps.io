import { Router } from 'express';
import { getRecoveryStats } from '../controllers/analyticsController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// No validation middleware needed here as there are no inputs
router.get('/recovery', requireAuth, getRecoveryStats);

export default router;