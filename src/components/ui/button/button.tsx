import { component$, Slot } from "@builder.io/qwik";
import { cn } from "~/lib/utils/merge-class";
import { type ButtonVariants, buttonVariants } from "./button-variants";

export interface ButtonProps extends ButtonVariants {
  isLoading?: boolean;
  class?: string;
  type?: "button" | "submit";
  onClick$?: () => Promise<void> | void;
  fullWidth?: boolean;
  loadingText?: string;
}

export const Button = component$((props: ButtonProps) => {
  const {
    variant,
    size,
    class: className,
    shape,
    theme,
    fullWidth,
    isLoading,
    loadingText,
    ...rest
  } = props;

  return (
    <button
      class={buttonVariants({
        variant,
        size,
        shape,
        theme,
        className: cn(fullWidth && "w-full", isLoading && "loading", className),
      })}
      {...rest}
    >
      {isLoading ? (
        loadingText
      ) : (
        <>
          <Slot name="icon" />
          <Slot />
        </>
      )}
    </button>
  );
});
