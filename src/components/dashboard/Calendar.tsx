import React from 'react';
import { format, isSameDay, isBefore, isAfter, differenceInDays, addDays, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Habit, HabitCompletion } from '@/types/habit';

interface CalendarDayProps {
  date: Date;
  isToday: boolean;
  completions: number;
  total: number;
  isCurrentMonth: boolean;
}

function CalendarDay({
  date,
  isToday,
  completions,
  total,
  isCurrentMonth,
}: CalendarDayProps) {
  const dayNumber = date.getDate();
  
  let status = 'empty';
  if (completions > 0) {
    status = completions >= total ? 'completed' : 'partial';
  } else if (isCurrentMonth && isBefore(date, startOfDay(new Date()))) {
    status = 'missed';
  }

  const statusClasses = {
    completed: 'bg-habit-success text-white',
    partial: 'bg-habit-warning text-white',
    missed: 'bg-habit-danger/20 text-gray-500',
    empty: 'bg-gray-100 text-gray-400',
  };

  return (
    <div
      className={cn(
        'h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium',
        isToday && 'ring-2 ring-primary',
        isCurrentMonth ? statusClasses[status] : 'bg-gray-50 text-gray-300'
      )}
    >
      {dayNumber}
    </div>
  );
}

interface HabitCalendarProps {
  habits: Habit[];
  completions: HabitCompletion[];
  month?: Date;
}

function HabitCalendar({
  habits,
  completions,
  month = new Date(),
}: HabitCalendarProps) {
  const today = startOfDay(new Date());
  const daysInView = 14; // Show 14 days
  
  // Generate days for display
  const days = Array.from({ length: daysInView }, (_, i) => {
    const date = addDays(today, i - 7); // Start 7 days before today
    const isToday = isSameDay(date, today);
    const isCurrentMonth = date.getMonth() === month.getMonth();
    
    // Count completions for this day
    const dayCompletions = completions.filter(c => isSameDay(new Date(c.date), date));
    const totalHabits = habits.filter(h => !h.isArchived).length;
    
    return {
      date,
      isToday,
      completions: dayCompletions.length,
      total: totalHabits,
      isCurrentMonth,
    };
  });

  // Calculate completion percentage for the displayed days
  const totalCompletions = completions.filter(c => 
    isAfter(new Date(c.date), addDays(today, -7)) && 
    isBefore(new Date(c.date), addDays(today, 7))
  ).length;
  
  const totalPossible = habits.filter(h => !h.isArchived).length * daysInView;
  const completionPercentage = totalPossible > 0 
    ? Math.round((totalCompletions / totalPossible) * 100) 
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendário de Hábitos</CardTitle>
        <CardDescription>
          Sua atividade nos últimos {daysInView} dias.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-muted-foreground">
              {format(addDays(today, -7), 'PP', { locale: ptBR })}
            </div>
            <div className="font-semibold">Hoje</div>
            <div className="text-sm text-muted-foreground">
              {format(addDays(today, 6), 'PP', { locale: ptBR })}
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-1 px-2">
            {days.map((day, i) => (
              <CalendarDay
                key={i}
                date={day.date}
                isToday={day.isToday}
                completions={day.completions}
                total={day.total}
                isCurrentMonth={day.isCurrentMonth}
              />
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Taxa de conclusão:</span>
              <span className="text-sm font-bold">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-habit-success h-2.5 rounded-full" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HabitCalendar;
