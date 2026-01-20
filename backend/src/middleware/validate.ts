import type { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

// Function which checks if the request body strictly follows the schema specified
export const validate = (schema: ZodObject<any>, source: 'body' | 'query' = 'body') => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Dynamic property access: req['body'] or req['query']

      // req by default is read-only. As such, we need to modify the attribute of 
      // the body/ query to enable writing so that we can assign the property with
      // the data after validation from Zod

      // Make property writable
      Object.defineProperty(req, source, {
        value: { ...req[source] },
        writable: true,
      });
      // Assign the result from Zod validation
      req[source] = schema.parse(req[source]);
      // Property back to default
      Object.defineProperty(req, source, {
        value: { ...req[source] },
        writable: false,
      });
      
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
      console.log(error);
      return res.status(500).json({ error: true, message: 'Internal Validation Error' });
    }
  };