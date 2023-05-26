import { component$ } from "@builder.io/qwik";
import { Link, server$, useNavigate } from "@builder.io/qwik-city";
import { LogOutIcon, PlusIcon, UserIcon } from "lucide-qwik";
import { LinkButton, Logo } from "~/components/ui";
import { env } from "~/lib/env";
import { useGetUser } from "~/routes/layout";

export const logoutUser = server$(function () {
  const { cookie } = this;

  const { AUTH_SESSION_NAME } = env(this);

  cookie.delete(AUTH_SESSION_NAME, { path: "/" });
});

export const Navbar = component$(() => {
  const userId = useGetUser().value;

  const navigate = useNavigate();

  return (
    <div class="navbar">
      <LinkButton href="/" class="font-semibold text-lg flex-shrink-0">
        <Logo class="mr-2" />
        <span class="text-primary">Mar</span>
        gineanu
      </LinkButton>

      <div class="flex">
        {links.map((link) => (
          <LinkButton key={link.name} href={link.href}>
            {link.name}
          </LinkButton>
        ))}

        {userId ? (
          <div class="dropdown dropdown-end dropdown-hover">
            <label tabIndex={0} class="btn btn-circle btn-ghost">
              <UserIcon class="w-5 h-5" />
            </label>
            <ul
              tabIndex={0}
              class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/article/create">
                  <PlusIcon class="w-4 h-4" />
                  New article
                </Link>
              </li>
              <li>
                <Link href="/project/create">
                  <PlusIcon class="w-4 h-4" />
                  New project
                </Link>
              </li>
              <li
                onClick$={async () => {
                  await logoutUser();

                  await navigate(undefined, true);
                }}
              >
                <a>
                  <LogOutIcon class="w-4 h-4" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
});

const links = [
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "About me",
    href: "/about-me",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
