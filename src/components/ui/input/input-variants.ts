import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva("input input-bordered", {
  variants: {
    size: {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;
