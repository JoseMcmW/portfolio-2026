import { useTheme } from "@/features/theme";
import { useContactForm } from "../hooks/useContactForm";
import { SubmitButton } from "./SubmitButton";

export const ContactForm = () => {
  const { formState, formAction } = useContactForm();
  const { theme } = useTheme();
  const logoColor = theme === 'dark' ? '#F4320B' : '#221F20';

  return (
    <div id="contact" className="min-h-90vh container mx-auto px-4 py-8 md:py-16 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <svg width="70" height="70" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 15 L34 15 L34 68 Q34 82 50 82 Q66 82 66 68 L66 45 Q66 32 53 32 L53 44 Q54 44 54 45 L54 68 Q54 70 50 70 Q46 70 46 68 L46 15 L22 15 Z" fill={logoColor}/>
              <circle cx="60" cy="20" r="6" fill={logoColor}/>
            </svg>
          </div>
          <p className="text-text-secondary text-sm md:text-lg mb-4">
            Got a vision? Ready to take your project to the next level? Let's build it.
          </p>
        </div>

        <form action={formAction} className="space-y-6 md:space-y-12" noValidate>
          <div className="space-y-2">
            <input
              type="text"
              name="name"
              key={`name-${formState.success}`}
              defaultValue={formState.data?.name || ""}
              placeholder="Your name"
              className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-text-primary text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors"
            />
            {formState.errors?.name && (
              <p className="font-serif text-red-500 text-xs mt-1">{formState.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="email"
              name="email"
              key={`email-${formState.success}`}
              defaultValue={formState.data?.email || ""}
              placeholder="your@email.com"
              className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-text-primary text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors"
            />
            {formState.errors?.email && (
              <p className="font-serif text-red-500 text-xs mt-1">{formState.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <textarea
              name="message"
              key={`message-${formState.success}`}
              defaultValue={formState.data?.message || ""}
              placeholder="Let me know how can I help you..."
              rows={4}
              className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-text-primary text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors resize-none"
            />
            {formState.errors?.message && (
              <p className="font-serif text-red-500 text-xs mt-1">{formState.errors.message}</p>
            )}
          </div>

          <SubmitButton />
        </form>
      </div>
    </div>
  );
};