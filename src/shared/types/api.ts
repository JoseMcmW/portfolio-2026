// Shared types for API operations

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: unknown;
}

export interface ContactDatabaseEntry extends ContactFormData {
  id?: string;
  created_at?: string;
}

// Form state for contact form
export interface FormState {
  errors?: Partial<Record<keyof ContactFormData, string>>;
  success?: boolean;
  message?: string;
  data?: ContactFormData;
  isSubmitting?: boolean;
}

// Generic API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}