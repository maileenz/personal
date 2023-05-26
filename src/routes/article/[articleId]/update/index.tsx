import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { UploadIcon, ViewIcon } from "lucide-qwik";
import {
  ArticleImage,
  ArticleImageMenu,
} from "~/components/starter/article-image";
import {
  Button,
  Card,
  Container,
  ErrorPage,
  FormControl,
  Input,
  LinkButton,
  Textarea,
} from "~/components/ui";
import { getUserId } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma.server";

export const useUpdateArticlePublishState = routeAction$(
  async (input, req) => {
    const { publish } = input;

    const {
      redirect,
      params: { articleId },
    } = req;

    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        publishedAt: publish ? new Date() : null,
      },
    });

    throw redirect(302, `/article/${articleId}/update`);
  },
  zod$({
    publish: z.boolean(),
  })
);

export const useUpdateArticle = routeAction$(
  async (data, req) => {
    const {
      redirect,
      params: { articleId },
    } = req;

    await prisma.article.update({
      where: {
        id: articleId,
      },
      data,
    });

    throw redirect(302, `/article/${articleId}`);
  },
  zod$({
    image: z.string().optional(),
    title: z.string().min(1),
    subtitle: z.string().optional(),
    content: z.string().min(1),
  })
);

export const useGetArticle = routeLoader$(async (req) => {
  const {
    status,
    redirect,
    params: { articleId },
  } = req;

  const userId = await getUserId(req);

  if (!userId) throw redirect(302, "/");

  const article = await prisma.article.findFirst({
    where: {
      id: articleId,
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

  const updateArticlePublishState = useUpdateArticlePublishState();

  const updateArticle = useUpdateArticle();

  const { value, isRunning } = updateArticle;

  const { id, image, title, subtitle, content, publishedAt } = article;

  return (
    <Container size="2xl">
      <Card compact>
        <ArticleImage q:slot="image" src={image}>
          <ArticleImageMenu q:slot="menu">
            <Button variant="ghost" shape="circle">
              <ViewIcon class="w-5 h-5" />
            </Button>

            <Button variant="ghost" shape="circle">
              <UploadIcon class="w-5 h-5" />
            </Button>
          </ArticleImageMenu>
        </ArticleImage>

        <Form action={updateArticle} class="card-body gap-0.5">
          <FormControl title="Title" error={value?.fieldErrors?.title?.[0]}>
            <Input name="title" value={title} placeholder="Enter title" />
          </FormControl>

          <FormControl
            title="Description"
            error={value?.fieldErrors?.subtitle?.[0]}
          >
            <Input
              name="subtitle"
              value={subtitle}
              placeholder="Enter subtitle"
            />
          </FormControl>

          <FormControl title="Content" error={value?.fieldErrors?.content?.[0]}>
            <Textarea
              name="content"
              value={content}
              placeholder="Write here..."
              class="min-h-[150px]"
            />
          </FormControl>

          <div class="grid gap-2 mt-4">
            <LinkButton href={`/article/${id}`} variant="outline">
              View article
            </LinkButton>

            <Button
              variant="outline"
              type="button"
              onClick$={async () => {
                await updateArticlePublishState.submit({
                  publish: !publishedAt,
                });
              }}
              isLoading={updateArticlePublishState.isRunning}
            >
              {publishedAt ? "Unpublish" : "Publish"}
            </Button>

            <Button type="submit" isLoading={isRunning}>
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});
