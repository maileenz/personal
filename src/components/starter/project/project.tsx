import { component$ } from "@builder.io/qwik";
import { type Project as IProject } from "@prisma/client";
import { Container, Title, Subtitle } from "~/components/ui";

export interface ProjectProps {
  project: IProject;
}

export const Project = component$<ProjectProps>((props) => {
  const { project } = props;

  return (
    <Container colorScheme="transparent">
      <Container
        size="2xl"
        variant="no-padding"
        class="grid sm:grid-cols-2 gap-6"
      >
        <img
          src={"https://picsum.photos/400/300"}
          width="400"
          height="300"
          class="rounded-lg"
        />

        <div class="flex flex-col items-center justify-center">
          <Title>{project.name}</Title>
          <Subtitle>{project.description}</Subtitle>
        </div>
      </Container>
    </Container>
  );
});
