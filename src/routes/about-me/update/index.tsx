import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { requireAuth } from "~/lib/auth.server";

export const useAuthLoader = routeLoader$(async (req) => {
  await requireAuth(req);
});

export default component$(() => {
  return <></>;
});
