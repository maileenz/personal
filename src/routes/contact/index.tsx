import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  Form,
  routeAction$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { MailIcon } from "lucide-qwik";
import {
  Button,
  Card,
  Container,
  FormControl,
  Input,
  Select,
  Textarea,
  Title,
  Toolbar,
} from "~/components/ui";
import { sendMail } from "~/lib/nodemailer";
import { prisma } from "~/lib/prisma.server";

export const useSendContactEmail = routeAction$(
  async (input) => {
    const user = await prisma.user.findFirst();

    if (user) await sendMail(input, user.email);
  },
  zod$({
    name: z.string().min(1),
    email: z.string().email(),
    subject: z.string().min(5),
    message: z.string().min(25),
  })
);

export default component$(() => {
  const sendEmail = useSendContactEmail();

  return (
    <Container size="xl">
      <Card compact>
        <Toolbar q:slot="header">
          <MailIcon q:slot="icon" class="mr-3" />
          <Title q:slot="title">Send me an email</Title>
        </Toolbar>

        <Form action={sendEmail} class="card-body gap-0.5">
          <FormControl
            title="Name"
            error={sendEmail.value?.fieldErrors?.name?.[0]}
          >
            <Input name="name" placeholder="Enter name" />
          </FormControl>

          <FormControl
            title="Email"
            error={sendEmail.value?.fieldErrors?.email?.[0]}
          >
            <Input name="email" placeholder="Enter email" type="email" />
          </FormControl>

          <FormControl
            title="Subject"
            error={sendEmail.value?.fieldErrors?.subject?.[0]}
          >
            <Select name="subject" placeholder="Select subject">
              <option>Other</option>
            </Select>
          </FormControl>

          <FormControl
            title="Message"
            error={sendEmail.value?.fieldErrors?.message?.[0]}
          >
            <Textarea
              name="message"
              placeholder="Enter message"
              class="min-h-[150px]"
            />
          </FormControl>

          <Button type="submit" class="mt-4" isLoading={sendEmail.isRunning}>
            Send
          </Button>
        </Form>
      </Card>
    </Container>
  );
});

export const head: DocumentHead = {
  title: "Margineanu`s Inbox",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
