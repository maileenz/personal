import { component$ } from "@builder.io/qwik";
import { Subtitle } from "../subtitle";
import { Title } from "../title";

export interface ErrorPageProps {
  status?: number;
  message: string;
}

export const ErrorPage = component$<ErrorPageProps>((props) => {
  const { status = 500, message } = props;

  return (
    <div class="fixed inset-0 flex flex-col items-center justify-center">
      <Title>{status}</Title>
      <Subtitle>{message}</Subtitle>
    </div>
  );
});
