import { apiConfig } from '../utils/config';

// Base API service class for HTTP operations
export class ApiService {
  private baseURL: string;
  private timeout: number;

  constructor(baseURL?: string, timeout?: number) {
    this.baseURL = baseURL || apiConfig.baseURL;
    this.timeout = timeout || apiConfig.timeout;
  }

  // Generic request method with centralized error handling
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      // Handle non-OK responses
      if (!response.ok) {
        return this.handleErrorResponse(response);
      }

      // Parse and return successful response
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      return this.handleRequestError(error);
    }
  }

  // Centralized error response handler
  private async handleErrorResponse(response: Response): Promise<never> {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    let errorDetails: unknown;

    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
      errorDetails = errorData.details;
    } catch {
      // If response body is not JSON, use status text
    }

    throw new ApiError(errorMessage, response.status, undefined, errorDetails);
  }

  // Centralized request error handler
  private handleRequestError(error: unknown): never {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408, 'TIMEOUT');
      }

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new ApiError('Network error. Please check your connection.', 0, 'NETWORK_ERROR');
      }

      throw new ApiError(error.message, 500, 'INTERNAL_ERROR');
    }

    throw new ApiError('Unknown error occurred', 500, 'UNKNOWN_ERROR');
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(endpoint, this.baseURL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return this.request<T>(url.pathname + url.search);
  }

  // POST request
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Custom API Error class with enhanced error information
export class ApiError extends Error {
  public status: number;
  public code?: string;
  public details?: unknown;

  constructor(
    message: string,
    status: number,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;

    // Maintains proper stack trace for where error was thrown (V8 only)
    const ErrorConstructor = Error as unknown as { captureStackTrace?: (target: object, constructor: Function) => void };
    if (typeof ErrorConstructor.captureStackTrace === 'function') {
      ErrorConstructor.captureStackTrace(this, ApiError);
    }
  }

  // Helper to check if error is a specific type
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isNetworkError(): boolean {
    return this.status === 0;
  }

  isTimeout(): boolean {
    return this.status === 408 || this.code === 'TIMEOUT';
  }

  // Format error for user display
  toUserMessage(): string {
    if (this.isNetworkError()) {
      return 'Network error. Please check your connection and try again.';
    }

    if (this.isTimeout()) {
      return 'Request timed out. Please try again.';
    }

    if (this.isServerError()) {
      return 'Server error. Please try again later.';
    }

    return this.message;
  }
}

// Default API service instance
export const apiService = new ApiService();