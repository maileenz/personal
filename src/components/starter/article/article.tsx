import { component$ } from "@builder.io/qwik";
import type { Article as IArticle } from "@prisma/client";
import {
  Avatar,
  Card,
  Toolbar,
  Title,
  Subtitle,
  Button,
  LinkButton,
} from "../../ui";
import { format } from "date-fns";
import { EditIcon, StarIcon } from "lucide-qwik";
import { useGetUser } from "~/routes/layout";
import { ArticleImage } from "../article-image";

export interface ArticleProps {
  article: Omit<IArticle, "updatedAt" | "createdAt">;
}

export const Article = component$<ArticleProps>((props) => {
  const {
    article: { id, image, title, content, publishedAt },
  } = props;

  const userId = useGetUser().value;

  return (
    <Card compact>
      <ArticleImage q:slot="image" src={image} />

      <Toolbar q:slot="header">
        <Avatar q:slot="icon" class="mr-4" />

        <Title q:slot="title">{title}</Title>

        <Subtitle q:slot="subtitle">
          {publishedAt
            ? `posted on ${format(publishedAt, "MMMM do, yyyy")}`
            : "Not published"}
        </Subtitle>

        {userId ? (
          <LinkButton
            q:slot="menu"
            variant="ghost"
            shape="circle"
            class="ml-auto self-start"
            size="sm"
            href={`/article/${id}/update`}
          >
            <EditIcon class="w-5 h-5" />
          </LinkButton>
        ) : (
          <Button
            q:slot="menu"
            variant="ghost"
            shape="circle"
            class="ml-auto self-start"
            size="sm"
          >
            <StarIcon class="w-5 h-5" />
          </Button>
        )}
      </Toolbar>
      <div class="card-body">
        <p>{content}</p>
      </div>
      <div class="px-2 pb-2">
        <LinkButton href={`/article/${id}`} variant="ghost" size="sm" fullWidth>
          Read more
        </LinkButton>
      </div>
    </Card>
  );
});
