import type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js'

// AuthUser and AuthSessions are abstractions from the supabase user and session.
// This ensures that we can swap to other authentication services/ schemes in the future by changing the type in this file.
export interface AuthUser extends SupabaseUser {
   // Potential to add custom app-specific fields here if needed later
   // e.g. role?: 'admin' | 'user';
}

export type AuthSession = SupabaseSession;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SocialPlatform {
  name: string;
  link: string;
}