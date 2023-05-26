import { component$, Slot } from "@builder.io/qwik";
import {
  type ContainerVariants,
  containerVariants,
} from "./container-variants";

export interface ContainerProps extends ContainerVariants {
  class?: string;
}

export const Container = component$<ContainerProps>((props) => {
  const { size, class: className, variant, colorScheme, ...rest } = props;

  return (
    <div
      class={containerVariants({ size, variant, colorScheme, className })}
      {...rest}
    >
      <Slot />
    </div>
  );
});
