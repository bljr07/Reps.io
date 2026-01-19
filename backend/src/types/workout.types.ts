// Models the shape of the data coming from the Database and to the User

// ==========================================
// 1. DOMAIN ENTITIES (Mirroring Database Tables)
// ==========================================

export interface WorkoutSet {
  id: string;          // UUID Pk
  workout_id: string;  // UUID Fk
  exercise_id: string; // UUID Fk
  set_order: number;
  weight_kg: number;
  reps: number;
  // Optional: If we joined with the exercise table to get the name
  exercise?: {
    name: string;
    equipment: string;
  };
}

export interface Workout {
  id: string;          // UUID Pk
  user_id: string;     // UUID Fk
  name: string;
  start_time: string;  // ISO Date String
  end_time: string | null;
  notes: string | null;
  // Optional: Nested sets if fetched via a join
  workout_sets?: WorkoutSet[]; 
}

// ==========================================
// 2. API RESPONSE SHAPES (Sent to the User)
// ==========================================

export interface WorkoutResponse {
  success: boolean;
  workout_id: string;
  message: string;
}

export interface HistoryResponse {
  page: number;
  limit: number;
  total: number;
  workouts: Workout[];
}