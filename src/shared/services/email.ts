import type { ContactFormData, ContactResponse } from '../types/api';
import { ApiService, ApiError } from './api';

/**
 * Email service for contact form functionality
 * This service handles infrastructure concerns only (HTTP communication)
 * Domain logic and validation should be handled in feature hooks
 */
export class EmailService {
  private apiService: ApiService;

  constructor(apiService?: ApiService) {
    this.apiService = apiService || new ApiService();
  }

  /**
   * Send contact form email via API
   * Handles HTTP communication and error transformation
   */
  async sendContactEmail(data: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await this.apiService.post<ContactResponse>(
        '/contact',
        data
      );

      return {
        success: true,
        message: response.message || "Message sent successfully! I'll get back to you soon.",
      };
    } catch (error) {
      return this.handleEmailError(error);
    }
  }

  /**
   * Centralized error handler for email operations
   * Transforms API errors into user-friendly responses
   */
  private handleEmailError(error: unknown): ContactResponse {
    console.error('Email service error:', error);

    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.toUserMessage(),
        details: error.details,
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Failed to send message. Please try again.',
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

// Default email service instance
export const emailService = new EmailService();