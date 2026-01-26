export interface RecoveryStat {
  muscle_group_name: string;
  days_since_last_workout: number;
}

export interface WeeklyChartData {
  label: string;  // e.g., "M", "T", "W"
  height: string; // e.g., "40%"
  active: boolean;
}

// Might break this up in the future depending on what we show in the UI
export interface DashboardSummary {
  weeklyVolume: number;
  weeklyVolumeTrend: number;
  currentStreak: number;
  totalVolume: number;
}