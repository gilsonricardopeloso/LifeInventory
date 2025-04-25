import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import HabitCard from './HabitCard';
import HabitForm from './HabitForm';
import type { Habit } from '@/types/habit';

interface HabitListProps {
  habits: Habit[];
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'isArchived'>) => void;
  onUpdateHabit: (habit: Habit) => void;
  onDeleteHabit: (habitId: string) => void;
  onCompleteHabit: (habitId: string) => void;
  completedHabits: Record<string, boolean>;
  habitStreaks: Record<string, number>;
}

function HabitList({
  habits,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
  onCompleteHabit,
  completedHabits,
  habitStreaks,
}: HabitListProps) {
  const { toast } = useToast();
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleAddHabit = (data: any) => {
    onAddHabit(data);
    setAddDialogOpen(false);
    toast({
      title: "Hábito criado",
      description: `O hábito "${data.name}" foi criado com sucesso!`,
    });
  };

  const handleEditHabit = (data: any) => {
    if (editingHabit) {
      const updatedHabit = { ...editingHabit, ...data };
      onUpdateHabit(updatedHabit);
      setEditingHabit(null);
      setEditDialogOpen(false);
      toast({
        title: "Hábito atualizado",
        description: `O hábito "${data.name}" foi atualizado com sucesso!`,
      });
    }
  };

  const handleDeleteHabit = (habitId: string) => {
    onDeleteHabit(habitId);
    toast({
      title: "Hábito excluído",
      description: "O hábito foi excluído com sucesso.",
      variant: "destructive",
    });
  };

  const handleEditClick = (habit: Habit) => {
    setEditingHabit(habit);
    setEditDialogOpen(true);
  };

  const handleCompleteHabit = (habitId: string) => {
    onCompleteHabit(habitId);
    toast({
      title: "Hábito concluído",
      description: "Parabéns! Você completou o hábito por hoje.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Seus Hábitos</h2>
        
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Novo Hábito</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Hábito</DialogTitle>
              <DialogDescription>
                Preencha os detalhes para criar um novo hábito para acompanhar.
              </DialogDescription>
            </DialogHeader>
            <HabitForm onSubmit={handleAddHabit} />
          </DialogContent>
        </Dialog>
      </div>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg">
          <p className="text-lg text-muted-foreground mb-4">Você ainda não tem hábitos registrados.</p>
          <Button 
            onClick={() => setAddDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Comece criando seu primeiro hábito</span>
          </Button>
        </div>
      ) : (
        <div className="habit-grid">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={handleCompleteHabit}
              onDelete={handleDeleteHabit}
              onEdit={handleEditClick}
              streak={habitStreaks[habit.id] || 0}
              completedToday={completedHabits[habit.id] || false}
            />
          ))}
        </div>
      )}

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Hábito</DialogTitle>
            <DialogDescription>
              Edite os detalhes do seu hábito.
            </DialogDescription>
          </DialogHeader>
          {editingHabit && <HabitForm onSubmit={handleEditHabit} habit={editingHabit} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HabitList;
