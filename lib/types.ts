// Define core types for the application

export type UserRole = 'user' | 'provider';

export type Category = 'fullstack' | 'backend' | 'frontend';

export type Currency = 'USD' | 'AUD' | 'SGD' | 'INR';

export type WorkType = 'Online' | 'Onsite';

export interface User {
  token: string;
  data:{
  id: string;
  name: string;
  email: string;
  role: UserRole;
  }
}



export interface Task {
  id: string;
  userId: string;
  category: Category;
  name: string;
  description: string;
  expectedStartDate: string; // ISO date string
  expectedWorkingHours: number;
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
export const CATEGORIES: Category[] = ['fullstack', 'backend', 'frontend'];
export const CURRENCIES: Currency[] = ['USD', 'AUD', 'SGD', 'INR'];
export const WORK_TYPES: WorkType[] = ['Online', 'Onsite'];