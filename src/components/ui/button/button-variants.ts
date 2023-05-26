import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva("btn", {
  variants: {
    shape: {
      circle: "btn-circle",
      square: "",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    },
    variant: {
      outline: "btn-outline",
      ghost: "btn-ghost",
      link: "btn-link",
    },
    theme: {
      primary: "btn-primary",
      secondary: "btn-secondary",
    },
  },
  defaultVariants: {
    size: "md",
    theme: "primary",
    shape: "square",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
