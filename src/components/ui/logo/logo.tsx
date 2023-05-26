import { component$ } from "@builder.io/qwik";
import { type LogoVariants, logoVariants } from "./logo-variants";
import { AppleIcon } from "lucide-qwik";
import { cn } from "~/lib/utils/merge-class";
import { type IconProps } from "lucide-qwik/lib-types/icon-props";

export interface LogoProps extends LogoVariants, Omit<IconProps, "size"> {
  class?: string;
}

export const Logo = component$<LogoProps>((props) => {
  const { size, class: className, ...rest } = props;

  return (
    <AppleIcon
      class={logoVariants({ size, className: cn("text-primary", className) })}
      {...rest}
    />
  );
});
