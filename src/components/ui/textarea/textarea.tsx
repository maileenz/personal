import { component$, type Signal } from "@builder.io/qwik";
import { cn } from "~/lib/utils/merge-class";
import { textareaVariants, type TextareaVariants } from "./textarea-variants";

export interface TextareaProps extends TextareaVariants {
  name?: string;
  class?: string;
  placeholder?: string;
  "q:value"?: Signal<string>;
  value?: string;
}

export const Textarea = component$<TextareaProps>((props) => {
  const { class: className, size, ...rest } = props;

  return (
    <textarea
      class={textareaVariants({ size, className: cn("py-2", className) })}
      {...rest}
    />
  );
});
