-- ==========================================
-- 1. SETUP & EXTENSIONS
-- ==========================================
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 2. TABLE DEFINITIONS
-- ==========================================

-- A. Reference Tables (Static Data)
CREATE TABLE muscle_groups (
    id TEXT PRIMARY KEY, -- e.g., 'chest', 'back'
    name TEXT NOT NULL,
    img_url TEXT -- Placeholder for future assets
);

CREATE TABLE sub_muscles (
    id TEXT PRIMARY KEY, -- e.g., 'upper_chest'
    group_id TEXT NOT NULL REFERENCES muscle_groups(id) ON DELETE CASCADE,
    name TEXT NOT NULL
);

-- B. The Hybrid Exercise Table (System + User Custom)
CREATE TABLE exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sub_muscle_id TEXT NOT NULL REFERENCES sub_muscles(id),
    name TEXT NOT NULL,
    -- Simple validation for equipment types to keep UI filters clean
    equipment TEXT NOT NULL CHECK (
        equipment IN ('Dumbbell', 'Barbell', 'Ez-Bar', 'Machine', 'Cable', 'Bodyweight', 'Smith Machine', 'Other')
    ),
    -- KEY FEATURE: NULL = System Default, UUID = User Custom
    created_by_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- C. User Workout Data
CREATE TABLE workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT, -- e.g., "Monday Push"
    start_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    end_time TIMESTAMPTZ, -- NULL means workout is currently active
    notes TEXT
);

CREATE TABLE workout_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workout_id UUID NOT NULL REFERENCES workouts(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES exercises(id),
    set_order INTEGER NOT NULL, -- 1, 2, 3...
    weight_kg NUMERIC(5,2), -- Allows 2 decimal places e.g., 22.50
    reps INTEGER NOT NULL
);

-- ==========================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE muscle_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_muscles ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sets ENABLE ROW LEVEL SECURITY;

-- 3a. Static Data Policies (Readable by everyone)
CREATE POLICY "Public Read Muscle Groups" ON muscle_groups FOR SELECT USING (true);
CREATE POLICY "Public Read Sub Muscles" ON sub_muscles FOR SELECT USING (true);

-- 3b. Exercise Policies (The Shared/Private Logic)
CREATE POLICY "Read System Exercises and My Custom Exercises" 
ON exercises FOR SELECT 
USING (
    created_by_user_id IS NULL -- System data
    OR 
    created_by_user_id = auth.uid() -- My data
);

CREATE POLICY "Users can create custom exercises" 
ON exercises FOR INSERT 
WITH CHECK (created_by_user_id = auth.uid());

-- 3c. Workout Policies (Strictly Private)
CREATE POLICY "Users can see only their own workouts" 
ON workouts FOR ALL 
USING (user_id = auth.uid());

CREATE POLICY "Users can interact with sets of their own workouts" 
ON workout_sets FOR ALL 
USING (
    workout_id IN (
        SELECT id FROM workouts WHERE user_id = auth.uid()
    )
);

-- ==========================================
-- 4. ANALYTICS VIEW ("Days Since Last Worked")
-- ==========================================
-- This view allows the UI to query: "SELECT * FROM v_muscle_recovery" 
-- It automatically handles the complex joins and date math.

CREATE OR REPLACE VIEW v_muscle_recovery 
WITH (security_invoker = on) AS -- Enable RLS
SELECT 
    auth.uid() AS user_id, -- Force the current User ID to appear even if no workout data exists
    mg.id AS muscle_group_id,
    mg.name AS muscle_group_name,
    MAX(w.start_time) as last_worked_at,
    EXTRACT(DAY FROM (NOW() - MAX(w.start_time)))::INTEGER as days_since_last_workout
FROM muscle_groups mg
LEFT JOIN sub_muscles sm ON sm.group_id = mg.id
LEFT JOIN exercises e ON e.sub_muscle_id = sm.id
LEFT JOIN workout_sets ws ON ws.exercise_id = e.id
LEFT JOIN workouts w ON w.id = ws.workout_id AND w.user_id = auth.uid()
GROUP BY mg.id, mg.name;

-- ==========================================
-- 5. SEED DATA (The "Starter Pack")
-- ==========================================

-- Muscle Groups
INSERT INTO muscle_groups (id, name) VALUES
('chest', 'Chest'),
('back', 'Back'),
('legs', 'Legs'),
('shoulders', 'Shoulders'),
('arms', 'Arms'),
('abs', 'Abs / Core');

-- Sub Muscles
INSERT INTO sub_muscles (id, group_id, name) VALUES
('chest_upper', 'chest', 'Upper Chest'),
('chest_mid', 'chest', 'Middle Chest'),
('chest_lower', 'chest', 'Lower Chest'),
('back_lats', 'back', 'Lats'),
('back_traps', 'back', 'Traps / Upper Back'),
('legs_quads', 'legs', 'Quads'),
('legs_hams', 'legs', 'Hamstrings'),
('shoulders_front', 'shoulders', 'Front Delts'),
('shoulders_side', 'shoulders', 'Side Delts'),
('shoulders_rear', 'shoulders', 'Rear Delts'),
('arms_biceps', 'arms', 'Biceps'),
('arms_triceps', 'arms', 'Triceps'),
('abs_upper', 'abs', 'Upper Abs'), 
('abs_lower', 'abs', 'Lower Abs');

-- Exercises (Sample Data - mapped correctly)
INSERT INTO exercises (sub_muscle_id, name, equipment, created_by_user_id) VALUES
-- Chest
('chest_upper', 'Incline Dumbbell Press', 'Dumbbell', NULL),
('chest_upper', 'Incline Cable Fly', 'Cable', NULL),
('chest_mid', 'Barbell Bench Press', 'Barbell', NULL),
('chest_mid', 'Machine Chest Press', 'Machine', NULL),
-- Back
('back_lats', 'Lat Pulldown', 'Cable', NULL),
('back_lats', 'Dumbbell Row', 'Dumbbell', NULL),
('back_traps', 'Face Pull', 'Cable', NULL),
-- Legs
('legs_quads', 'Leg Extension', 'Machine', NULL),
('legs_quads', 'Goblet Squat', 'Dumbbell', NULL),
('legs_hams', 'Seated Leg Curl', 'Machine', NULL),
-- Shoulders
('shoulders_side', 'Lateral Raise', 'Dumbbell', NULL),
('shoulders_side', 'Cable Lateral Raise', 'Cable', NULL),
('shoulders_front', 'Military Press', 'Barbell', NULL),
('shoulders_rear', 'Reverse Pec Deck', 'Machine', NULL),
('shoulders_rear', 'Bent Over Dumbbell Raise', 'Dumbbell', NULL),
-- Arms
('arms_biceps', 'Hammer Curl', 'Dumbbell', NULL),
('arms_triceps', 'Tricep Pushdown', 'Cable', NULL),
-- Abs
('abs_upper', 'Cable Crunch', 'Cable', NULL),
('abs_upper', 'Machine Crunch', 'Machine', NULL),
('abs_lower', 'Hanging Leg Raise', 'Bodyweight', NULL),
('abs_lower', 'Captains Chair Leg Raise', 'Machine', NULL);