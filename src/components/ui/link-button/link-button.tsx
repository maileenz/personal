import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { type ButtonVariants, buttonVariants } from "~/components/ui";
import { cn } from "~/lib/utils/merge-class";

export interface LinkButtonProps extends ButtonVariants {
  class?: string;
  href?: string;
  target?: "_blank" | "_parent" | "_top" | "_self";
  fullWidth?: boolean;
}

export const LinkButton = component$<LinkButtonProps>((props) => {
  const {
    class: className,
    variant = "ghost",
    size,
    shape,
    theme,
    fullWidth,
    ...rest
  } = props;

  return (
    <Link
      class={buttonVariants({
        variant,
        size,
        shape,
        theme,
        className: cn(fullWidth && "w-full", className),
      })}
      {...rest}
    >
      <Slot />
    </Link>
  );
});
