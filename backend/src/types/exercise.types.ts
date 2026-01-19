// Models the shape of the data coming from the Database and to the User

// ==========================================
// 1. DOMAIN ENTITIES (Mirroring Database Tables)
// ==========================================

export interface Exercise {
  id: string;             // UUID
  sub_muscle_id: string;  // e.g. "chest_upper"
  name: string;
  equipment: 'Dumbbell' | 'Barbell' | 'Ez-Bar' | 'Machine' | 'Cable' | 'Bodyweight' | 'Smith Machine' | 'Other';
  created_by_user_id: string | null; // Null if system, UUID if custom
  created_at?: string;    // ISO Date
}

// ==========================================
// 2. API RESPONSE SHAPES (Sent to the User)
// ==========================================

// API Response Shape
export interface CreateExerciseResponse {
  success: boolean;
  exercise: Exercise;
}