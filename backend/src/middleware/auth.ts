import type { Request, Response, NextFunction } from 'express';
import { createUserClient } from '../config/supabase.js';

// Extend Express Request interface to include the user
export interface AuthenticatedRequest extends Request {
  user?: any;
  supabase?: any; // Attach the client to the request
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: true, code: 'AUTH_MISSING', message: 'Missing Authorization header' });
    return;
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  try {
    // 1. Create a client specific to this request
    const scopedClient = createUserClient(token!);

    // 2. Verify the token by asking for the user object
    const { data: { user }, error } = await scopedClient.auth.getUser();

    if (error || !user) {
      res.status(403).json({ error: true, code: 'AUTH_INVALID', message: 'Invalid or expired token' });
      return;
    }

    // 3. Attach user and the scoped client to the request
    req.user = user;
    req.supabase = scopedClient; // Controllers will use this connection
    next();
  } catch (err) {
    res.status(500).json({ error: true, code: 'AUTH_ERROR', message: 'Internal Authentication Error' });
  }
};