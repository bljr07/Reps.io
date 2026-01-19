import type { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

// Function which checks if the request body strictly follows the schema specified
export const validate = (schema: ZodObject<any>, source: 'body' | 'query' = 'body') => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Dynamic property access: req['body'] or req['query']
      schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: true,
          code: 'VALIDATION_ERROR',
          // Show exactly which parameter is wrong
          details: error.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }
      return res.status(500).json({ error: true, message: 'Internal Validation Error' });
    }
  };