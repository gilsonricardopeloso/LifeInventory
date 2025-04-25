
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { HabitCompletion } from '@/types/habit';

export function useHabitCompletion(initialCompletions: HabitCompletion[] = []) {
  const [completions, setCompletions] = useState<HabitCompletion[]>(initialCompletions);
  const { toast } = useToast();

  const handleCompleteHabit = (habitId: string) => {
    const newCompletion: HabitCompletion = {
      id: `completion-${Date.now()}`,
      habitId,
      date: new Date(),
      completedAt: new Date(),
      value: 1,
    };
    
    setCompletions(prev => [...prev, newCompletion]);

    toast({
      title: "Hábito concluído",
      description: "Parabéns! Você completou o hábito por hoje.",
    });

    return newCompletion;
  };

  return { completions, handleCompleteHabit };
}

