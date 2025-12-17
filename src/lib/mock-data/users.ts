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
  {
    id: '5',
    name: 'Empresa Gestão Lda',
    email: 'empresa@email.com',
    role: 'condo_company',
    phone: '+351 956 789 012',
  },
  {
    id: '6',
    name: 'Carlos Técnico',
    email: 'carlos@email.com',
    role: 'vendor',
    phone: '+351 967 890 123',
  },
  {
    id: '7',
    name: 'IHRU - Instituto',
    email: 'ihru@email.com',
    role: 'government',
    phone: '+351 978 901 234',
  },
];
