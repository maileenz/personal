import { component$, type Signal } from "@builder.io/qwik";
import { type InputVariants, inputVariants } from "./input-variants";

export interface InputProps extends InputVariants {
  class?: string;
  name?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  "q:value"?: Signal<string>;
  value?: string | null;
}

export const Input = component$<InputProps>((props) => {
  const { size, class: className, ...rest } = props;

  return <input class={inputVariants({ size, className })} {...rest} />;
});
