import { useActionState } from "react";
import { toast } from "sonner";
import { emailService } from "@/shared/services/email";
import { contactSchema } from "./useFormValidation";
import type { FormState, ContactFormData } from "@/shared/types/api";

async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data: ContactFormData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  // Validate form data using Zod schema (domain logic)
  const validationResult = contactSchema.safeParse(data);

  if (!validationResult.success) {
    const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};

    validationResult.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
      }
    });

    return {
      errors: fieldErrors,
      success: false,
      data,
      isSubmitting: false,
    };
  }

  try {
    // Send email using the email service
    const response = await emailService.sendContactEmail(data);

    if (!response.success) {
      toast.error(response.error || "Failed to send message. Please try again.");
      return {
        errors: {},
        success: false,
        data,
        isSubmitting: false,
      };
    }

    toast.success("Message sent successfully! I'll get back to you soon.");
    return {
      errors: {},
      success: true,
      data: { name: "", email: "", message: "" },
      isSubmitting: false,
    };
  } catch (error) {
    console.error("Error sending message:", error);
    toast.error("Network error. Please check your connection and try again.");
    return {
      errors: {},
      success: false,
      data,
      isSubmitting: false,
    };
  }
}

const initialState: FormState = {
  errors: {},
  success: false,
  data: { name: "", email: "", message: "" },
  isSubmitting: false,
};

export const useContactForm = () => {
  const [formState, formAction] = useActionState<FormState, FormData>(
    submitContactForm,
    initialState
  );

  return {
    formState,
    formAction,
    isSubmitting: formState.isSubmitting || false,
  };
};