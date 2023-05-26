import { component$, Slot } from "@builder.io/qwik";
import { cn } from "~/lib/utils/merge-class";
import { LinkButton } from "../link-button";

export interface SocialLinkProps {
  class?: string;
  href?: string;
}

export const SocialLink = component$<SocialLinkProps>((props) => {
  const { class: className, ...rest } = props;

  return (
    <LinkButton
      shape="circle"
      variant="ghost"
      class={cn("opacity-50 hover:opacity-100 flex-shrink-0", className)}
      target="_blank"
      {...rest}
    >
      <Slot />
    </LinkButton>
  );
});
