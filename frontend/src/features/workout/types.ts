export interface WorkoutSet {
  setNumber: number; // or string
  prev: string;
  kg: string | number;
  reps: string | number;
}

export interface ActiveExercise {
  id: string; // Unique ID for the list
  name: string;
  sets: WorkoutSet[];
}

export interface MuscleGroup {
  id: string;
  name: string;
  lastWorkedDays: number;
  imageUrl: string;
}