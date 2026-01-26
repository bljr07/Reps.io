import type { StatusDisplayInfo } from "./types";

export const getMuscleIcon = (muscleName: string): string => {
  const map: Record<string, string> = {
    'Chest': 'fitness_center',
    'Legs': 'directions_run',
    'Back': 'accessibility_new',
    'Arms': 'fitness_center',
    'Shoulders': 'accessibility',
    'Abs': 'trip_origin'
  };
  return map[muscleName] || 'fitness_center';
}

export const getStatus = (daysAgo: number): StatusDisplayInfo => {
    switch (daysAgo) {
        case null:
            return { label: 'No information', color: 'info', icon: 'question' }
        case 1:
            return { label: 'Fatigued', color: 'danger', icon: 'triangle-exclamation' }
        case 2:
            return { label: 'Recovering', color: 'warning', icon: 'battery-half' }
        default:
            return { label: 'Ready', color: 'success', icon: 'check-circle' }
    }
}