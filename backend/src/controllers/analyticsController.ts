import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import { AnalyticsService } from '../services/analyticsService.js';

export const getRecoveryStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // 1. Initialize Service
    const service = new AnalyticsService(req.supabase!, req.user.id);

    // 2. Execute Logic (No parameters needed)
    const stats = await service.getMuscleRecoveryStats();

    // 3. Return Success
    res.status(200).json({
      success: true,
      data: stats
    });

  } catch (err: any) {
    res.status(500).json({ 
      error: true, 
      message: err.message 
    });
  }
};