import { component$, Slot, type Signal } from "@builder.io/qwik";
import { cn } from "~/lib/utils/merge-class";
import { selectVariants, type SelectVariants } from "./select-variants";

export interface SelectProps extends SelectVariants {
  name?: string;
  class?: string;
  placeholder?: string;
  "q:value"?: Signal<string>;
  value?: string;
}

export const Select = component$<SelectProps>((props) => {
  const { class: className, size, placeholder, ...rest } = props;

  return (
    <select
      class={selectVariants({ size, className: cn("py-2", className) })}
      {...rest}
    >
      {placeholder ? (
        <option disabled selected>
          {placeholder}
        </option>
      ) : null}
      <Slot />
    </select>
  );
});
