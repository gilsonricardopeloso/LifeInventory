export type HabitFrequency = "daily" | "weekly" | "custom"

export interface Habit {
  id: string
  name: string
  description?: string
  icon?: string
  frequency: HabitFrequency
  target: number // Number of times to complete (e.g., 1 for daily, 3 for 3x per week)
  createdAt: Date
  reminderTime?: string // Time to remind (HH:MM format)
  color?: string // Custom color for the habit
  category?: string // Category of the habit (e.g., 'health', 'work', etc.)
  isArchived: boolean
}

export interface HabitCompletion {
  id: string
  habitId: string
  date: Date // The date of completion
  completedAt: Date // The exact time of completion
  value: number // How many times completed that day (e.g., 1 for a single completion)
  notes?: string // Optional notes for this completion
}

export interface HabitStats {
  habitId: string
  habitName: string
  totalCompletions: number
  currentStreak: number
  longestStreak: number
  completionRate: number // percentage
}

export interface DailyProgress {
  date: Date
  completed: number
  missed: number
  pending: number
}
