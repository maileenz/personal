import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { prisma } from "~/lib/prisma.server";
import bcrypt from "bcryptjs";
import {
  Button,
  Card,
  Container,
  FormControl,
  Input,
  Toolbar,
  Title,
  Subtitle,
} from "~/components/ui";
import { requireVisitor } from "~/lib/auth.server";
import { updateSession } from "~/lib/session.server";
import { env } from "~/lib/env";

export const useCreateUser = routeAction$(
  async ({ name, email, password }, req) => {
    const { redirect } = req;

    const { AUTH_SESSION_NAME } = env(req);

    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hash,
      },
    });

    await updateSession(req, {
      name: AUTH_SESSION_NAME,
      session: { userId: user.id },
    });

    redirect(302, "/");
  },
  zod$({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    //acceptTerms: z.literal(true),
  })
);

export const useLoader = routeLoader$(async (req) => {
  const { redirect } = req;

  await requireVisitor(req);

  const user = await prisma.user.findFirst();

  if (user) throw redirect(301, "/admin");
});

export default component$(() => {
  const register = useCreateUser();

  return (
    <Container size="lg">
      <Card compact>
        <Toolbar q:slot="header">
          <Title q:slot="title">Create new admin account</Title>
          <Subtitle q:slot="subtitle">Set up your portfolio</Subtitle>
        </Toolbar>

        <Form action={register} class="card-body gap-0.5">
          <FormControl title="Name">
            <Input name="name" placeholder="Enter name" />
          </FormControl>

          <FormControl title="Email">
            <Input name="email" placeholder="Enter email" type="email" />
          </FormControl>

          <FormControl title="Password">
            <Input
              name="password"
              placeholder="Enter password"
              type="password"
            />
          </FormControl>

          <Button type="submit" class="mt-4">
            Create account
          </Button>
        </Form>
      </Card>
    </Container>
  );
});
