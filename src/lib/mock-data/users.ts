import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@email.com',
    role: 'tenant',
    phone: '+351 912 345 678',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'owner',
    phone: '+351 923 456 789',
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    role: 'agent',
    phone: '+351 934 567 890',
  },
  {
    id: '4',
    name: 'Ana Ferreira',
    email: 'ana@email.com',
    role: 'manager',
    phone: '+351 945 678 901',
  },
];
