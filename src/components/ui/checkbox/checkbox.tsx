import { component$, Slot } from "@builder.io/qwik";

export const Checkbox = component$((props: any) => {
  const { ...rest } = props;

  return (
    <label class="flex items-center gap-2 py-1 cursor-pointer w-auto">
      <input {...rest} type="checkbox" class="w-4 h-4" />
      <span class="leading-4">
        <Slot />
      </span>
    </label>
  );
});
