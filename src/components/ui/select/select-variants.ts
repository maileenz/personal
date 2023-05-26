import { cva, type VariantProps } from "class-variance-authority";

export const selectVariants = cva("select select-bordered", {
  variants: {
    size: {
      xs: "select-xs",
      sm: "select-sm",
      md: "select-md",
      lg: "select-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SelectVariants = VariantProps<typeof selectVariants>;
