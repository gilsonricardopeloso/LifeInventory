
import React from 'react';
import { format } from "date-fns";
import { CheckCircle2, Circle } from "lucide-react";
import type { Habit } from "@/types/habit";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from '@/contexts/LanguageContext';

interface DailyHabitListProps {
  date: Date;
  habits: Habit[];
  completions: { habitId: string; date: Date }[];
}

export function DailyHabitList({ date, habits, completions }: DailyHabitListProps) {
  const { t } = useLanguage();
  const activeHabits = habits.filter(h => !h.isArchived);
  const dateStr = format(date, 'yyyy-MM-dd');

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">
        {t('habitsFor', 'calendar')} {format(date, 'PP')}
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('habit', 'calendar')}</TableHead>
            <TableHead>{t('status', 'calendar')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeHabits.map((habit) => {
            const isCompleted = completions.some(
              c => c.habitId === habit.id && format(new Date(c.date), 'yyyy-MM-dd') === dateStr
            );

            return (
              <TableRow key={habit.id}>
                <TableCell className="font-medium">{habit.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span className="text-green-500">{t('completed', 'calendar')}</span>
                      </>
                    ) : (
                      <>
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400">{t('pending', 'calendar')}</span>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
