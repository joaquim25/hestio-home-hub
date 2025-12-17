export type UserRole = 'tenant' | 'owner' | 'agent' | 'manager' | 'condo_company' | 'vendor' | 'government';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  type: 'apartment' | 'house' | 'studio' | 'villa';
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  status: 'available' | 'occupied' | 'maintenance';
  images: string[];
  features: string[];
  description: string;
  ownerId: string;
  tenantId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  propertyId: string;
  tenantId: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  paidDate?: string;
  description: string;
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  tenantId: string;
  category: 'plumbing' | 'electrical' | 'hvac' | 'structural' | 'appliance' | 'other';
  description: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
}

export interface Document {
  id: string;
  name: string;
  type: 'lease' | 'invoice' | 'legal' | 'other';
  propertyId?: string;
  uploadedBy: string;
  uploadedAt: string;
  size: string;
  status: 'pending' | 'signed' | 'expired';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  highlighted?: boolean;
}
