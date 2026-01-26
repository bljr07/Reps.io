export interface RecoveryStat {
  muscle_group_name: string;
  days_since_last_workout: number;
}

export interface WeeklyChartData {
  label: string;  // e.g., "M", "T", "W"
  height: string; // e.g., "40%"
  active: boolean;
}