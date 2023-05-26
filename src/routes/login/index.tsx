import { component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { prisma } from "~/lib/prisma.server";
import bcrypt from "bcrypt";
import {
  Button,
  Checkbox,
  Container,
  Input,
  Card,
  Toolbar,
  Title,
} from "~/components/ui";
import { requireVisitor } from "~/lib/auth.server";
import { updateSession } from "~/lib/session.server";
import { env } from "~/lib/env";

export const useLoginUser = routeAction$(
  async (input, req) => {
    const { email, password, rememberMe } = input;

    const { redirect } = req;

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        hash: true,
      },
    });

    if (!user) throw new Error("Invalid credentials");

    const validHash = await bcrypt.compare(password, user.hash);

    if (!validHash) throw new Error("Invalid credentials");

    const { AUTH_SESSION_NAME } = env(req);

    await updateSession(
      req,
      {
        name: AUTH_SESSION_NAME,
        session: { userId: user.id },
      },
      { maxAge: [rememberMe ? 7 : 3, "days"] }
    );

    throw redirect(302, "/");
  },
  zod$({
    email: z.string().email(),
    password: z.string(),
    rememberMe: z.boolean().optional(),
  })
);

export const useLoader = routeLoader$(async (req) => {
  await requireVisitor(req);
});

export default component$(() => {
  const login = useLoginUser();

  return (
    <Container size="md">
      <Card compact>
        <Toolbar q:slot="header">
          <Title q:slot="title">Login to account</Title>
        </Toolbar>

        <Form action={login} class="card-body">
          <Input name="email" placeholder="Enter email" />
          <Input name="password" type="password" placeholder="Enter password" />

          <div class="flex justify-between">
            <Checkbox name="rememberMe">Remember me</Checkbox>

            <span>Recover password</span>
          </div>

          <Button type="submit" isLoading={login.isRunning}>
            Sign in
          </Button>
        </Form>
      </Card>
    </Container>
  );
});
