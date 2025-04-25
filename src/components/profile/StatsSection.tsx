
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBarBig, ChartArea, ChartLine, ChartPie } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface StatsSectionProps {
  userId: string;
}

const StatsSection = ({ userId }: StatsSectionProps) => {
  // Mock data for demonstration
  const stats = {
    totalHabits: 12,
    completionRate: 85,
    currentStreak: 7,
    longestStreak: 14,
    weeklyProgress: [
      { day: 'Segunda', completed: 5, total: 6 },
      { day: 'Terça', completed: 4, total: 6 },
      { day: 'Quarta', completed: 6, total: 6 },
      { day: 'Quinta', completed: 3, total: 6 },
      { day: 'Sexta', completed: 5, total: 6 },
      { day: 'Sábado', completed: 4, total: 6 },
      { day: 'Domingo', completed: 2, total: 6 },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Hábitos</CardTitle>
            <ChartBarBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHabits}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <ChartPie className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sequência Atual</CardTitle>
            <ChartLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak} dias</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Sequência</CardTitle>
            <ChartArea className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.longestStreak} dias</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dia</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead className="text-right">Taxa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.weeklyProgress.map((day) => (
                <TableRow key={day.day}>
                  <TableCell>{day.day}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={(day.completed / day.total) * 100} className="h-2" />
                      <span className="text-sm text-muted-foreground">
                        {day.completed}/{day.total}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round((day.completed / day.total) * 100)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSection;
