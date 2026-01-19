// Models the shape of the data the User sends over

import { z } from 'zod'; // Zod is a validation library

// Define the shape of a single set
const SetSchema = z.object({
  exercise_id: z.uuid({ message: "Invalid Exercise ID format" }),
  set_order: z.number().int().positive(),
  weight_kg: z.number().nonnegative({ message: "Weight cannot be negative" }),
  reps: z.number().int().positive({ message: "Reps must be at least 1" })
});

// Define the shape of the main workout submission
export const saveWorkoutSchema = z.object({
  name: z.string().min(1, "Workout name is required").max(100),
  // Enforce ISO 8601 Date String
  start_time: z.iso.datetime({ message: "Start time must be a valid ISO date" }),
  end_time: z.iso.datetime({ message: "End time must be a valid ISO date" }).optional(),
  notes: z.string().max(500).optional(),
  sets: z.array(SetSchema).min(1, "You cannot save an empty workout")
});

export const historyQuerySchema = z.object({
  // If ?page= is missing, default to 1. If present, convert string to number.
  page: z.coerce.number().int().min(1).default(1),
  // Cap the limit to 100 to prevent database scraping
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

// Export the Type for use in the Controller
export type SaveWorkoutDTO = z.infer<typeof saveWorkoutSchema>;
export type HistoryQueryDTO = z.infer<typeof historyQuerySchema>;