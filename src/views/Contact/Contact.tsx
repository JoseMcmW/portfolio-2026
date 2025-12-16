import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { useThemeStore } from "@/store/themeStore";

const contactSchema = z.object({
  name: z.string().min(2, "The name must be at least 2 characters long"),
  email: z.email({ message: "Invalid email" }),
  message: z.string().min(10, "The message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof ContactFormData, string>>;

interface FormState {
  errors?: FormErrors;
  success?: boolean;
  message?: string;
  data?: {
    name: string;
    email: string;
    message: string;
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-4 text-xl font-medium text-bg-primary bg-text-primary hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Sending..." : "Send"}
    </button>
  );
}

async function submitAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors: FormErrors = {};
    result.error.issues.forEach((issue) => {
      if (issue.path[0]) {
        fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
      }
    });
    return {
      errors: fieldErrors,
      success: false,
      data,
    };
  }

  try {
    // Call the serverless API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData.success) {
      return {
        errors: {},
        success: false,
        message: responseData.error || "Failed to send message. Please try again.",
        data,
      };
    }

    return {
      errors: {},
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      data: { name: "", email: "", message: "" },
    };
  } catch (error) {
    console.error("Error sending message:", error);
    return {
      errors: {},
      success: false,
      message: "Network error. Please check your connection and try again.",
      data,
    };
  }
}

export const Contact = () => {
  const [state, formAction] = useActionState<FormState, FormData>(
    submitAction,
    {
      errors: {},
      success: false,
      data: { name: "", email: "", message: "" }
    }
  );

  const theme = useThemeStore((state) => state.theme);
  const logoColor = theme === 'dark' ? '#F4320B' : '#221F20';

  return (
    <div id="contact" className="min-h-screen container mx-auto px-4 py-8 md:py-16 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 15 L34 15 L34 68 Q34 82 50 82 Q66 82 66 68 L66 45 Q66 32 53 32 L53 44 Q54 44 54 45 L54 68 Q54 70 50 70 Q46 70 46 68 L46 15 L22 15 Z" fill={logoColor}/>
              <circle cx="60" cy="20" r="6" fill={logoColor}/>
            </svg>
          </div>
          <p className="text-text-secondary text-sm md:text-lg mb-4">
            Get in touch with me
          </p>
        </div>

        <form action={formAction} className="space-y-6 md:space-y-12" noValidate>
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              key={`name-${state.success}`}
              defaultValue={state.data?.name || ""}
              placeholder="Your name"
              className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-text-primary text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors"
            />
            {state.errors?.name && (
              <p className="font-serif text-red-500 text-xs mt-1">{state.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="email"
              name="email"
              key={`email-${state.success}`}
              defaultValue={state.data?.email || ""}
              placeholder="your@email.com"
              className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-text-primary text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors"
            />
            {state.errors?.email && (
              <p className="font-serif text-red-500 text-xs mt-1">{state.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <textarea
              name="message"
              key={`message-${state.success}`}
              defaultValue={state.data?.message || ""}
              placeholder="Let me know how can I help you..."
              rows={4}
              className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-text-primary text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors resize-none"
            />
            {state.errors?.message && (
              <p className="font-serif text-red-500 text-xs mt-1">{state.errors.message}</p>
            )}
          </div>

          {state.message && (
            <div className={`text-center p-4 ${
              state.success
                ? 'bg-accent/10 border border-accent'
                : 'bg-red-500/10 border border-red-500'
            }`}>
              <p className={`text-sm md:text-lg ${state.success ? 'text-accent' : 'text-text-secondary'}`}>
                {state.message}
              </p>
            </div>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}