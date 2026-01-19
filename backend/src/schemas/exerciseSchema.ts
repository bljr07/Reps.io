// Models the shape of the data the User sends over

import { z } from 'zod';

// Same enforcement as Database Constraints
const EquipmentEnum = z.enum([
  'Dumbbell', 
  'Barbell', 
  'Ez-Bar', 
  'Machine', 
  'Cable', 
  'Bodyweight', 
  'Smith Machine', 
  'Other'
]);

export const createExerciseSchema = z.object({
  name: z.string().min(1, "Exercise name is required").max(100),
  sub_muscle_id: z.string().min(1, "Sub-muscle ID is required"), // e.g. "chest_upper"
  equipment: EquipmentEnum
});

// Infer the DTO (Data Transfer Object) from the schema for use in the Controller
export type CreateExerciseDTO = z.infer<typeof createExerciseSchema>;