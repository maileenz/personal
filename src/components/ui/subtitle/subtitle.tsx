import { component$, Slot } from "@builder.io/qwik";

export const Subtitle = component$((props) => {
  return (
    <div class="text-black/70" {...props}>
      <Slot />
    </div>
  );
});
