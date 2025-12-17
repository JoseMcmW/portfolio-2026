import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
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
};