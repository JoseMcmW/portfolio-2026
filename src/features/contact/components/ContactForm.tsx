
import { useContactForm } from "../hooks/useContactForm";
import { SubmitButton } from "./SubmitButton";

export const ContactForm = () => {
  const { formState, formAction } = useContactForm();

  return (
    <form action={formAction} className="space-y-6 md:space-y-12" noValidate>
      <div className="space-y-2">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          autoComplete="name"
          key={`name-${formState.success}`}
          defaultValue={formState.data?.name || ""}
          placeholder="Your name"
          aria-invalid={!!formState.errors?.name}
          aria-describedby={formState.errors?.name ? "name-error" : undefined}
          required
          className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-shadow-hover/60 text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors"
        />
        {formState.errors?.name && (
          <p id="name-error" className="font-serif text-red-500 text-xs mt-1">{formState.errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          key={`email-${formState.success}`}
          defaultValue={formState.data?.email || ""}
          placeholder="your@email.com"
          aria-invalid={!!formState.errors?.email}
          aria-describedby={formState.errors?.email ? "email-error" : undefined}
          required
          className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-shadow-hover/60 text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors"
        />
        {formState.errors?.email && (
          <p id="email-error" className="font-serif text-red-500 text-xs mt-1">{formState.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          autoComplete="off"
          key={`message-${formState.success}`}
          defaultValue={formState.data?.message || ""}
          placeholder="Let me know how can I help you..."
          rows={4}
          aria-invalid={!!formState.errors?.message}
          aria-describedby={formState.errors?.message ? "message-error" : undefined}
          required
          className="w-full bg-transparent border-0 border-b-2 border-text-secondary/30 focus:border-shadow-hover/60 text-text-primary text-sm md:text-2xl py-4 px-0 placeholder:text-text-secondary/50 focus:outline-none transition-colors resize-none"
        />
        {formState.errors?.message && (
          <p id="message-error" className="font-serif text-red-500 text-xs mt-1">{formState.errors.message}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
};