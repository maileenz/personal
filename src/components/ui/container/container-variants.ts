import { cva, type VariantProps } from "class-variance-authority";

export const containerVariants = cva("w-full mx-auto", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      full: "",
    },
    variant: {
      default: "p-4 sm:p-6",
      "no-padding": "",
    },
    colorScheme: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-50",
      transparent: "bg-white/30",
    },
  },
  defaultVariants: {
    size: "full",
    variant: "default",
  },
});

export type ContainerVariants = VariantProps<typeof containerVariants>;
