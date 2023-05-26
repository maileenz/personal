import { component$, useSignal } from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  routeAction$,
  z,
  zod$,
  routeLoader$,
} from "@builder.io/qwik-city";
import { EditIcon, UploadIcon, ViewIcon } from "lucide-qwik";
import {
  ArticleImage,
  ArticleImageMenu,
} from "~/components/starter/article-image";
import {
  Button,
  Card,
  Container,
  FormControl,
  Input,
  Textarea,
  Title,
  Toolbar,
} from "~/components/ui";
import { requireAuth } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma.server";

export const useCreateArticle = routeAction$(
  async (input, req) => {
    await requireAuth(req);

    const { publish, ...inputRest } = input;

    const { redirect } = req;

    const { id } = await prisma.article.create({
      data: {
        ...inputRest,
        publishedAt: publish ? new Date() : null,
      },
    });

    throw redirect(302, `/article/${id}`);
  },
  zod$({
    image: z.string().optional(),
    title: z.string().min(1),
    subtitle: z.string().optional(),
    content: z.string().min(1),
    publish: z.boolean().optional(),
  })
);

export const useAuthLoader = routeLoader$(async (req) => {
  await requireAuth(req);
});

export default component$(() => {
  const createArticle = useCreateArticle();

  const { submit, value, isRunning } = createArticle;

  const image = useSignal("");
  const title = useSignal("");
  const subtitle = useSignal("");
  const content = useSignal("");

  const publishing = useSignal(false);

  return (
    <Container size="2xl">
      <Card compact>
        <ArticleImage q:slot="image" src={image.value}>
          <ArticleImageMenu q:slot="menu">
            {image.value ? (
              <Button variant="ghost" shape="circle">
                <ViewIcon class="w-5 h-5" />
              </Button>
            ) : null}

            <Button variant="ghost" shape="circle">
              <UploadIcon class="w-5 h-5" />
            </Button>

            <input
              onChange$={(e) => {
                const imageBlob = e.target.files?.[0];

                console.log({ imageBlob });

                image.value = "http://";
              }}
              type="file"
            />
          </ArticleImageMenu>
        </ArticleImage>

        <Toolbar q:slot="header">
          <EditIcon q:slot="icon" class="mr-3" />
          <Title q:slot="title">Create a new article</Title>
        </Toolbar>

        <Form action={createArticle} class="card-body gap-0.5">
          <FormControl title="Name" error={value?.fieldErrors?.title?.[0]}>
            <Input q:value={title} name="title" placeholder="Enter title" />
          </FormControl>

          <FormControl
            title="Subtitle"
            error={value?.fieldErrors?.subtitle?.[0]}
          >
            <Input
              q:value={subtitle}
              name="subtitle"
              placeholder="Enter subtitle"
            />
          </FormControl>

          <FormControl title="Content" error={value?.fieldErrors?.content?.[0]}>
            <Textarea
              q:value={content}
              name="content"
              placeholder="Write here..."
              class="min-h-[150px]"
            />
          </FormControl>

          <div class="grid gap-2 mt-4">
            <Button
              variant="outline"
              onClick$={async () => {
                publishing.value = true;

                const { value } = await submit({
                  image: image.value,
                  title: title.value,
                  subtitle: subtitle.value,
                  content: content.value,
                  publish: true,
                });

                publishing.value = false;

                console.log(value);
              }}
              isLoading={publishing && isRunning}
            >
              Save & Publish
            </Button>

            <Button type="submit" isLoading={!publishing && isRunning}>
              Save
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Create article",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
