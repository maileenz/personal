import { component$, Slot } from "@builder.io/qwik";

export interface ArticleImageProps {
  src?: string | null;
}

export const ArticleImage = component$<ArticleImageProps>((props) => {
  const { src, ...rest } = props;

  return (
    <div class="relative" {...rest}>
      <figure class="aspect-[3/1] rounded-top-xl overflow-hidden">
        <img
          src={src ?? undefined}
          class="h-full w-full"
          width="600"
          height="200"
        />
      </figure>

      <Slot name="menu" />
    </div>
  );
});

export const ArticleImageMenu = component$((props) => {
  return (
    <div class="flex absolute right-3 bottom-3" {...props}>
      <Slot />
    </div>
  );
});
