import { component$, Slot } from "@builder.io/qwik";

export const Toolbar = component$((props) => {
  return (
    <div class="flex items-center px-4 pt-4" {...props}>
      <Slot name="icon" />

      <div class="flex flex-col">
        <Slot name="title" />
        <Slot name="subtitle" />
      </div>

      <Slot name="menu" />
    </div>
  );
});
