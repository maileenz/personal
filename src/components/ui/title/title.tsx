import { component$, Slot } from "@builder.io/qwik";
import { cn } from "~/lib/utils/merge-class";

export interface TitleProps {
  class?: string;
}

export const Title = component$<TitleProps>((props) => {
  const { class: className, ...rest } = props;

  return (
    <div class={cn("text-lg font-semibold", className)} {...rest}>
      <Slot />
    </div>
  );
});
