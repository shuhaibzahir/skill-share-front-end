// Define core types for the application

export type UserRole = 'user' | 'provider';

export type Category = 'Web Development' | 'Design' | 'Tutoring';

export type Currency = 'USD' | 'AUD' | 'SGD' | 'INR';

export type WorkType = 'Online' | 'Onsite';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Task {
  id: string;
  userId: string;
  category: Category;
  name: string;
  description: string;
  startDate: string; // ISO date string
  workingHours: number;
  hourlyRate: number;
  currency: Currency;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  providerId: string;
  category: Category;
  experience: number; // in years
  workType: WorkType;
  hourlyRate: number;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  taskId: string;
  providerId: string;
  hourlyRate: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

// Mock data
export const CATEGORIES: Category[] = ['Web Development', 'Design', 'Tutoring'];
export const CURRENCIES: Currency[] = ['USD', 'AUD', 'SGD', 'INR'];
export const WORK_TYPES: WorkType[] = ['Online', 'Onsite'];