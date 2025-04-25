import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HabitList from '@/components/habits/HabitList';
import mockData from '@/mock-data';
import type { Habit, HabitCompletion } from '@/types/habit';

function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(mockData.habits);
  const [completions, setCompletions] = useState<HabitCompletion[]>(mockData.completions);
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>({});
  const [habitStreaks, setHabitStreaks] = useState<Record<string, number>>({});

  // Calcular os hábitos concluídos hoje e as sequências
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Verificar quais hábitos foram concluídos hoje
    const completed: Record<string, boolean> = {};
    completions.forEach(completion => {
      const completionDate = new Date(completion.date);
      completionDate.setHours(0, 0, 0, 0);
      
      if (completionDate.getTime() === today.getTime()) {
        completed[completion.habitId] = true;
      }
    });
    setCompletedHabits(completed);

    // Calcular sequências (simplificado para esta demonstração)
    const streaks: Record<string, number> = {};
    habits.forEach(habit => {
      // Aqui apenas definimos um valor de sequência simulado
      streaks[habit.id] = Math.floor(Math.random() * 10);
    });
    setHabitStreaks(streaks);
  }, [habits, completions]);

  const handleAddHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'isArchived'>) => {
    const newHabit: Habit = {
      id: `habit-${Date.now()}`,
      createdAt: new Date(),
      isArchived: false,
      ...habitData,
    };
    setHabits([...habits, newHabit]);
  };

  const handleUpdateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ));
  };

  const handleDeleteHabit = (habitId: string) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const handleCompleteHabit = (habitId: string) => {
    // Criar um novo registro de conclusão
    const newCompletion: HabitCompletion = {
      id: `completion-${Date.now()}`,
      habitId,
      date: new Date(),
      completedAt: new Date(),
      value: 1,
    };
    
    // Atualizar o estado
    setCompletions([...completions, newCompletion]);
    setCompletedHabits({ ...completedHabits, [habitId]: true });
  };

  const activeHabits = habits.filter(h => !h.isArchived);
  const archivedHabits = habits.filter(h => h.isArchived);

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Hábitos</h1>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-2 mb-8">
          <TabsTrigger value="active">Ativos ({activeHabits.length})</TabsTrigger>
          <TabsTrigger value="archived">Arquivados ({archivedHabits.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <HabitList
            habits={activeHabits}
            onAddHabit={handleAddHabit}
            onUpdateHabit={handleUpdateHabit}
            onDeleteHabit={handleDeleteHabit}
            onCompleteHabit={handleCompleteHabit}
            completedHabits={completedHabits}
            habitStreaks={habitStreaks}
          />
        </TabsContent>
        
        <TabsContent value="archived">
          {archivedHabits.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg">
              <p className="text-lg text-muted-foreground">Você não tem hábitos arquivados.</p>
            </div>
          ) : (
            <HabitList
              habits={archivedHabits}
              onAddHabit={handleAddHabit}
              onUpdateHabit={handleUpdateHabit}
              onDeleteHabit={handleDeleteHabit}
              onCompleteHabit={handleCompleteHabit}
              completedHabits={completedHabits}
              habitStreaks={habitStreaks}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default HabitsPage;
