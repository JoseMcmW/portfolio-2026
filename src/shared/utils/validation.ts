import { z } from 'zod';
import { validation } from './constants';
import type { ContactFormData } from '../types/api';

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(validation.minNameLength, `Name must be at least ${validation.minNameLength} characters`)
    .max(validation.maxNameLength, `Name must be less than ${validation.maxNameLength} characters`)
    .trim(),
  
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  
  message: z
    .string()
    .min(validation.minMessageLength, `Message must be at least ${validation.minMessageLength} characters`)
    .max(validation.maxMessageLength, `Message must be less than ${validation.maxMessageLength} characters`)
    .trim()
});

// Email validation helper
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Name validation helper
export const isValidName = (name: string): boolean => {
  const trimmedName = name.trim();
  return trimmedName.length >= validation.minNameLength && 
         trimmedName.length <= validation.maxNameLength;
};

// Message validation helper
export const isValidMessage = (message: string): boolean => {
  const trimmedMessage = message.trim();
  return trimmedMessage.length >= validation.minMessageLength && 
         trimmedMessage.length <= validation.maxMessageLength;
};

// Generic validation result type
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Validate contact form data
export const validateContactForm = (data: Partial<ContactFormData>): ValidationResult => {
  try {
    contactFormSchema.parse(data);
    return { isValid: true, errors: [] };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        errors: error.issues.map((err) => err.message)
      };
    }
    return {
      isValid: false,
      errors: ['Validation failed']
    };
  }
};