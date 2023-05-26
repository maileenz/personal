import { component$, Slot } from "@builder.io/qwik";
import { cn } from "~/lib/utils/merge-class";

export const Card = component$((props: any) => {
  const { class: className, compact, ...rest } = props;

  return (
    <div class={cn("card", compact && "card-compact", className)} {...rest}>
      <Slot name="image" />
      <Slot name="header" />
      <Slot />
      <Slot name="actions" />
    </div>
  );
});
