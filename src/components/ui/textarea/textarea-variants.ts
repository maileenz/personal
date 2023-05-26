import { cva, type VariantProps } from "class-variance-authority";

export const textareaVariants = cva("textarea textarea-bordered", {
  variants: {
    size: {
      xs: "textarea-xs",
      sm: "textarea-sm",
      md: "textarea-md",
      lg: "textarea-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type TextareaVariants = VariantProps<typeof textareaVariants>;
