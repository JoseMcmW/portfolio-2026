# Shared Services

This directory contains infrastructure services that handle external communication and low-level operations. These services are **infrastructure-only** and should not contain domain logic.

## Architecture Principles

### Infrastructure vs Domain Logic

**Services handle (Infrastructure):**
- HTTP communication
- API request/response handling
- Error transformation
- Network operations
- External integrations

**Services DO NOT handle (Domain Logic):**
- Business rules
- Data validation
- State management
- UI logic
- Feature-specific workflows

Domain logic belongs in **feature hooks** (e.g., `features/contact/hooks/useContactForm.ts`).

## Available Services

### ApiService

Base HTTP service for making API requests with centralized error handling.

**Usage:**
```typescript
import { apiService, ApiError } from '@/shared/services';

// GET request
const data = await apiService.get<ResponseType>('/endpoint');

// POST request
const result = await apiService.post<ResponseType>('/endpoint', { data });

// Error handling
try {
  const data = await apiService.get('/endpoint');
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.toUserMessage());
    console.log(error.status); // HTTP status code
    console.log(error.code); // Error code
  }
}
```

**Features:**
- Automatic timeout handling
- Centralized error transformation
- Type-safe requests
- User-friendly error messages

### EmailService

Service for sending emails via the contact API endpoint.

**Usage:**
```typescript
import { emailService } from '@/shared/services';

const response = await emailService.sendContactEmail({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello!'
});

if (response.success) {
  console.log(response.message);
} else {
  console.error(response.error);
}
```

**Note:** Validation should be done in feature hooks using `useFormValidation`, not in the service.

## Error Handling

All services use the centralized `ApiError` class for consistent error handling:

```typescript
export class ApiError extends Error {
  status: number;        // HTTP status code
  code?: string;         // Error code (e.g., 'TIMEOUT', 'NETWORK_ERROR')
  details?: unknown;     // Additional error details
  
  // Helper methods
  isClientError(): boolean;  // 4xx errors
  isServerError(): boolean;  // 5xx errors
  isNetworkError(): boolean; // Network failures
  isTimeout(): boolean;      // Timeout errors
  toUserMessage(): string;   // User-friendly message
}
```

## Configuration

Services use configuration from `shared/utils/config.ts`:

```typescript
export const apiConfig = {
  baseURL: '/api',
  timeout: 10000,
  retry: {
    attempts: 3,
    delay: 1000
  }
};
```

## Testing

Services should be tested with mocked HTTP responses:

```typescript
import { ApiService } from '@/shared/services';

describe('ApiService', () => {
  it('should handle successful requests', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: 'test' })
    });
    
    const service = new ApiService();
    const result = await service.get('/test');
    
    expect(result).toEqual({ data: 'test' });
  });
});
```

## Adding New Services

When adding a new service:

1. Create the service class in this directory
2. Export it from `index.ts`
3. Keep it focused on infrastructure only
4. Use `ApiService` as the base for HTTP operations
5. Document usage in this README
6. Add proper error handling using `ApiError`

**Example:**
```typescript
// shared/services/analytics.ts
import { ApiService } from './api';

export class AnalyticsService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async trackEvent(event: string, data: unknown): Promise<void> {
    await this.apiService.post('/analytics/track', { event, data });
  }
}

export const analyticsService = new AnalyticsService();
```
