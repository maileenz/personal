import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Navbar } from "~/components/starter/navbar";
import { getUserId } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma.server";

export const useGetUser = routeLoader$(async (req) => {
  const { redirect, url } = req;

  const userId = await getUserId(req);

  if (!userId) {
    const user = await prisma.user.findFirst();

    const isInstallPage = url.pathname.split("/")[1] === "install";

    if (!user && !isInstallPage) throw redirect(302, "/install");
  }

  return userId;
});

export default component$(() => {
  return (
    <>
      <Navbar />

      <Slot />
    </>
  );
});
