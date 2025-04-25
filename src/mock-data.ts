
import { Habit, HabitCompletion } from './types/habit';

// Dados de exemplo para a demonstração
const habits: Habit[] = [
  {
    id: 'habit-1',
    name: 'Beber água',
    description: 'Beber 2 litros de água por dia',
    frequency: 'daily',
    target: 1,
    createdAt: new Date('2023-04-10'),
    category: 'health',
    isArchived: false,
  },
  {
    id: 'habit-2',
    name: 'Exercício físico',
    description: 'Fazer pelo menos 30 minutos de exercício',
    frequency: 'daily',
    target: 1,
    createdAt: new Date('2023-04-08'),
    category: 'fitness',
    reminderTime: '07:00',
    isArchived: false,
  },
  {
    id: 'habit-3',
    name: 'Meditar',
    description: 'Meditar durante 10 minutos',
    frequency: 'daily',
    target: 1,
    createdAt: new Date('2023-04-12'),
    category: 'mindfulness',
    reminderTime: '22:00',
    isArchived: false,
  },
  {
    id: 'habit-4',
    name: 'Ler',
    description: 'Ler por pelo menos 20 minutos',
    frequency: 'daily',
    target: 1,
    createdAt: new Date('2023-04-15'),
    category: 'learning',
    isArchived: false,
  },
  {
    id: 'habit-5',
    name: 'Projeto pessoal',
    description: 'Trabalhar no projeto pessoal',
    frequency: 'weekly',
    target: 3,
    createdAt: new Date('2023-04-05'),
    category: 'productivity',
    isArchived: false,
  },
  {
    id: 'habit-6',
    name: 'Ligar para família',
    description: 'Manter contato com a família',
    frequency: 'weekly',
    target: 2,
    createdAt: new Date('2023-03-20'),
    category: 'social',
    isArchived: true,
  },
];

// Gerar completions aleatórias para os últimos 14 dias
const generateCompletions = (): HabitCompletion[] => {
  const completions: HabitCompletion[] = [];
  const today = new Date();
  
  habits.forEach(habit => {
    // Gerar completions para cada hábito nos últimos 14 dias aleatoriamente
    for (let i = 0; i < 14; i++) {
      // 70% de chance de ter completado o hábito em um dia
      if (Math.random() < 0.7) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        date.setHours(Math.floor(Math.random() * 24));
        date.setMinutes(Math.floor(Math.random() * 60));
        
        completions.push({
          id: `completion-${habit.id}-${i}`,
          habitId: habit.id,
          date: new Date(date),
          completedAt: new Date(date),
          value: 1,
          notes: Math.random() < 0.3 ? 'Nota de exemplo' : undefined,
        });
      }
    }
  });
  
  return completions;
};

const completions = generateCompletions();

// Dados mockados para o frontend
const mockData = {
  habits,
  completions,
};

export default mockData;
