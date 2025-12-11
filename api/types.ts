// Shared types for the contact API

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
