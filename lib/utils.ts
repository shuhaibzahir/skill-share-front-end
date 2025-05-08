import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Currency } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatCurrency(amount: number, currency: Currency): string {
  const currencySymbols: Record<Currency, string> = {
    USD: '$',
    AUD: 'A$',
    SGD: 'S$',
    INR: '₹',
  };

  return `${currencySymbols[currency]}${amount.toFixed(2)}`;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
}