
import { useContactForm } from "../hooks/useContactForm";
import { SubmitButton } from "./SubmitButton";

export const ContactForm = () => {
  const { formState, formAction } = useContactForm();

  return (
    <form action={formAction} className="space-y-6 md:space-y-12" noValidate>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          autoComplete="name"
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
          autoComplete="email"
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
          autoComplete="off"
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
  );
};