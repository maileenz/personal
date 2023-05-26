import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Article } from "~/components/starter/article";
import { Container } from "~/components/ui";
import { getUserId } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma.server";

export const useGetArticles = routeLoader$(async (req) => {
  const userId = await getUserId(req);

  const articles = await prisma.article.findMany({
    where: {
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
    orderBy: {
      publishedAt: "desc",
    },
  });

  return articles;
});

export default component$(() => {
  const articles = useGetArticles().value;

  return (
    <Container size="2xl" class="flex flex-col gap-4">
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Margineanu`s Blog",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
