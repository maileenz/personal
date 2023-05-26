import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  Avatar,
  Card,
  Container,
  SocialLink,
  Subtitle,
  Title,
} from "~/components/ui";
import { prisma } from "~/lib/prisma.server";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-qwik";

export const useGetAboutUser = routeLoader$(async () => {
  const user = await prisma.user.findFirst({
    select: {
      name: true,
      avatar: true,
      website: true,
      aboutMe: true,
      github: true,
      linkedIn: true,
    },
  });

  if (!user) throw new Error("You need to create admin account.");

  return user;
});

export default component$(() => {
  const user = useGetAboutUser().value;

  return (
    <Container size="xl">
      <Card class="mt-8 flex flex-col items-center">
        <div class="card-body items-center text-center">
          <Avatar
            src={user.avatar}
            size="2xl"
            shape="squircle"
            class="-mt-16"
          />

          <div class="mt-3 flex flex-col items-center">
            <Title>{user.name}</Title>
            <Subtitle>Junior developer</Subtitle>
          </div>

          <p class="my-6 w-full">{user.aboutMe}</p>

          <div class="flex divide-x divide-dashed divide-black/40">
            {user.github ? (
              <div class="px-2">
                <SocialLink href={`https://github.com/${user.github}`}>
                  <GithubIcon />
                </SocialLink>
              </div>
            ) : null}

            {user.linkedIn ? (
              <div class="px-2">
                <SocialLink href={`https://linkedin.com/${user.linkedIn}`}>
                  <LinkedinIcon />
                </SocialLink>
              </div>
            ) : null}

            {user.github ? (
              <div class="px-2">
                <SocialLink href={`https://twitter.com/${user.github}`}>
                  <TwitterIcon />
                </SocialLink>
              </div>
            ) : null}
          </div>
        </div>
      </Card>
    </Container>
  );
});
