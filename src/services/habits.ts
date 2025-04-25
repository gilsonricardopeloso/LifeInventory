import mockData from "../mock-data"
import { Habit } from "@/types/habit"

/**
 * Get all habits
 * @returns Promise<Habit[]>
 */
export const getHabits = async (): Promise<Habit[]> => {
  // In a real application, this would fetch from an API
  return Promise.resolve(mockData.habits)
}

/**
 * Get a single habit by ID
 * @param id The habit ID
 * @returns Promise<Habit | undefined>
 */
export const getHabitById = async (id: string): Promise<Habit | undefined> => {
  // In a real application, this would fetch from an API
  return Promise.resolve(mockData.habits.find((habit) => habit.id === id))
}

/**
 * Create a new habit
 * @param habit The habit data
 * @returns Promise<Habit>
 */
export const createHabit = async (
  habit: Omit<Habit, "id" | "createdAt">
): Promise<Habit> => {
  // In a real application, this would post to an API
  const newHabit: Habit = {
    id: `habit-${Date.now()}`,
    createdAt: new Date(),
    isArchived: false,
    ...habit,
  }

  mockData.habits.push(newHabit)
  return Promise.resolve(newHabit)
}

/**
 * Update an existing habit
 * @param id The habit ID
 * @param updates The updates to apply
 * @returns Promise<Habit | undefined>
 */
export const updateHabit = async (
  id: string,
  updates: Partial<Habit>
): Promise<Habit | undefined> => {
  // In a real application, this would put to an API
  const index = mockData.habits.findIndex((habit) => habit.id === id)
  if (index === -1) return undefined

  mockData.habits[index] = { ...mockData.habits[index], ...updates }
  return Promise.resolve(mockData.habits[index])
}

/**
 * Archive a habit
 * @param id The habit ID
 * @returns Promise<Habit | undefined>
 */
export const archiveHabit = async (id: string): Promise<Habit | undefined> => {
  return updateHabit(id, { isArchived: true })
}

/**
 * Delete a habit
 * @param id The habit ID
 * @returns Promise<boolean>
 */
export const deleteHabit = async (id: string): Promise<boolean> => {
  // In a real application, this would delete from an API
  const index = mockData.habits.findIndex((habit) => habit.id === id)
  if (index === -1) return false

  mockData.habits.splice(index, 1)
  return Promise.resolve(true)
}
