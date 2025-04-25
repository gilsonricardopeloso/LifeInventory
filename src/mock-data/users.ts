
import { User } from '@/types/user';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Admin Silva',
    email: 'admin@habitflow.com',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
    preferences: {
      notifications: true,
      theme: 'light',
      language: 'pt-BR'
    }
  },
  {
    id: 'user-2',
    name: 'João Usuário',
    email: 'joao@email.com',
    role: 'user',
    createdAt: new Date('2024-02-15'),
    preferences: {
      notifications: true,
      theme: 'dark',
      language: 'pt-BR'
    }
  }
];

export const getCurrentUser = (): User => {
  // For demo purposes, always return the admin user
  return mockUsers[0];
};
