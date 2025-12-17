import { z } from "zod";
import type { ContactFormData } from "@/shared/types/api";
import { contactFormSchema } from "@/shared/utils/validation";

// Re-export centralized schema for backward compatibility
export const contactSchema = contactFormSchema;

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export const useFormValidation = () => {
  const validateForm = (data: ContactFormData): { isValid: boolean; errors: ContactFormErrors } => {
    const result = contactSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: ContactFormErrors = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      
      return {
        isValid: false,
        errors: fieldErrors,
      };
    }

    return {
      isValid: true,
      errors: {},
    };
  };

  const validateField = (field: keyof ContactFormData, value: string): string | null => {
    try {
      const fieldSchema = contactSchema.shape[field];
      fieldSchema.parse(value);
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues[0]?.message || "Invalid value";
      }
      return "Invalid value";
    }
  };

  return {
    validateForm,
    validateField,
    contactSchema,
  };
};