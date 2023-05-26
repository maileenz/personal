import { cva, type VariantProps } from "class-variance-authority";

export const avatarVariants = cva("avatar", {
  variants: {
    status: {
      online: "online",
      offline: "offline",
    },
  },
});

export const avatarImageVariants = cva(null, {
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-14 h-14",
      xl: "w-20 h-20",
      "2xl": "w-28 h-28",
    },
    shape: {
      rounded: "rounded",
      "rounded-full": "rounded-full",
      squircle: "mask mask-squircle",
      hexagon: "mask mask-hexagon",
      tiangle: "mask mask-triangle",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "rounded",
  },
});

export type AvatarVariants = VariantProps<typeof avatarVariants> &
  VariantProps<typeof avatarImageVariants>;
