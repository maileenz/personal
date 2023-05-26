import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Article } from "~/components/starter/article";
import { RelatedArticles } from "~/components/starter/related-articles";
import { Container, ErrorPage } from "~/components/ui";
import { getUserId } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma.server";

export const useGetArticle = routeLoader$(async (req) => {
  const {
    status,
    params: { articleId },
  } = req;

  const userId = await getUserId(req);

  const article = await prisma.article.findFirst({
    where: {
      id: articleId,
      publishedAt: userId
        ? undefined
        : {
            not: null,
          },
    },
    select: {
      id: true,
      image: true,
      title: true,
      subtitle: true,
      content: true,
      publishedAt: true,
    },
  });

  if (!article) status(404);

  return article;
});

export default component$(() => {
  const article = useGetArticle().value;

  if (!article) return <ErrorPage status={404} message="No article found" />;

  return (
    <Container size="2xl" class="flex flex-col gap-4">
      <Article article={article} />

      <RelatedArticles />
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Article name",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
