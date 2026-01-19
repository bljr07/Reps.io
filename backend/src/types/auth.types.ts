// Extend Express Request interface to include the user
export interface AuthenticatedRequest extends Request {
  user?: any;
  supabase?: any; // Attach the client to the request
}