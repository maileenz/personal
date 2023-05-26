import { component$ } from "@builder.io/qwik";
import { Card, Toolbar, Title } from "~/components/ui";

export const RelatedArticles = component$(() => {
  return (
    <Card>
      <Toolbar q:slot="header">
        <Title q:slot="title">Comments</Title>
      </Toolbar>
    </Card>
  );
});
