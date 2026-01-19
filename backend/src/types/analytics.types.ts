// Models the shape of the data coming from the Database and to the User

// ==========================================
// 1. DOMAIN ENTITIES (Mirroring Database Tables)
// ==========================================

export interface RecoveryStat {
  user_id: string;
  muscle_group_id: string;
  muscle_group_name: string;
  last_worked_at: string; // ISO Date String
  days_since_last_workout: number;
}

// ==========================================
// 2. API RESPONSE SHAPES (Sent to the User)
// ==========================================

// API Response Shape
export interface RecoveryStatsResponse {
  success: boolean;
  data: RecoveryStat[];
}