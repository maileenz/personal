import { component$ } from "@builder.io/qwik";
import {
  avatarImageVariants,
  avatarVariants,
  type AvatarVariants,
} from "./avatar-variants";

export interface AvatarProps extends AvatarVariants {
  src?: string | null;
  class?: string;
}

export const Avatar = component$<AvatarProps>((props) => {
  const { class: className, src, size, status, shape, ...rest } = props;

  return (
    <div
      class={avatarVariants({
        status,
        className,
      })}
    >
      <div class={avatarImageVariants({ size, shape })}>
        <img src={src ?? "https://picsum.photos/200"} {...rest} />
      </div>
    </div>
  );
});
