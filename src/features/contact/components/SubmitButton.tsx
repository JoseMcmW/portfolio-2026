import { useFormStatus } from "react-dom";
import { Spinner } from "@/shared";

export const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        w-full py-4 text-xl font-medium
        bg-text-primary text-bg-primary
        transition-colors
        hover:bg-text-primary/90
        focus-visible:outline
        focus-visible:outline-offset-2
        disabled:bg-text-primary/60
        disabled:cursor-not-allowed
      "
    >
      {pending ? <Spinner /> : "Send"}
    </button>
  );
};