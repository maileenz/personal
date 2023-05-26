import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Container } from "~/components/ui";

export default component$(() => {
  return (
    <Container size="xl" class="flex flex-col gap-4">
      home page
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Margineanu`s Universe",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
