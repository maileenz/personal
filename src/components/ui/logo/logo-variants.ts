import { cva, type VariantProps } from "class-variance-authority";

export const logoVariants = cva(null, {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-10 h-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type LogoVariants = VariantProps<typeof logoVariants>;
