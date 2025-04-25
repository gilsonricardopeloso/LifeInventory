
import { useState, useEffect } from 'react';
import type { Habit, HabitCompletion, DailyProgress } from '@/types/habit';

export function useHabitStats(habits: Habit[], completions: HabitCompletion[]) {
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>({});
  const [habitStreaks, setHabitStreaks] = useState<Record<string, number>>({});
  const [todayProgress, setTodayProgress] = useState<DailyProgress>({
    date: new Date(),
    completed: 0,
    missed: 0,
    pending: 0
  });

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Verificar conclusões de hoje
    const completed: Record<string, boolean> = {};
    completions.forEach(completion => {
      const completionDate = new Date(completion.date);
      completionDate.setHours(0, 0, 0, 0);
      
      if (completionDate.getTime() === today.getTime()) {
        completed[completion.habitId] = true;
      }
    });
    setCompletedHabits(completed);

    // Calcular progresso
    const activeHabits = habits.filter(h => !h.isArchived);
    const completedToday = Object.keys(completed).length;
    
    setTodayProgress({
      date: today,
      completed: completedToday,
      pending: activeHabits.length - completedToday,
      missed: 0
    });

    // Calcular sequências
    const streaks: Record<string, number> = {};
    habits.forEach(habit => {
      const habitCompletions = completions
        .filter(c => c.habitId === habit.id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      let currentStreak = 0;
      let lastDate = new Date();

      for (const completion of habitCompletions) {
        const completionDate = new Date(completion.date);
        const dayDiff = Math.floor(
          (lastDate.getTime() - completionDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (dayDiff <= 1) {
          currentStreak++;
          lastDate = completionDate;
        } else {
          break;
        }
      }

      streaks[habit.id] = currentStreak;
    });
    
    setHabitStreaks(streaks);
  }, [habits, completions]);

  return { completedHabits, habitStreaks, todayProgress };
}

