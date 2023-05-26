import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { Project } from "~/components/starter/project";
import { Container } from "~/components/ui";
import { prisma } from "~/lib/prisma.server";

export const useGetProjects = routeLoader$(async () => {
  const projects = await prisma.project.findMany();

  return projects;
});

export default component$(() => {
  const projects = useGetProjects().value;

  return projects.length === 0 ? (
    <Container size="xl" class="flex flex-col gap-4">
      "No projects"
    </Container>
  ) : (
    <>
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </>
  );
});

export const head: DocumentHead = {
  title: "Margineanu`s Projects",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
