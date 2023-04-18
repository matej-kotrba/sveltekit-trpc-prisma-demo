import { sequence } from "@sveltejs/kit/hooks";
import { createContext } from "./lib/trpc/context";
import { router } from "./lib/trpc/router"
import { redirect, type Handle } from "@sveltejs/kit";
import { createTRPCHandle } from "trpc-sveltekit"
import { SvelteKitAuth } from "@auth/sveltekit"
import type { Adapter } from "@auth/core/adapters";
import GitHub from "@auth/core/providers/github"
import { GITHUB_ID, GITHUB_SECRET, AUTH_SECRET } from "$env/static/private"
import prisma from "$lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const handleTRPCContext: Handle = createTRPCHandle({
  router: router,
  createContext: createContext,
})

const handleAuth: Handle = SvelteKitAuth({
  // Created PrismaAdapter with the Prisma client instance
  adapter: PrismaAdapter(prisma) as Adapter,
  // @ts-ignore
  providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
  secret: AUTH_SECRET,
  callbacks: {
    async signIn({ account, user }) {
      return true // Default behavior for other providers
    },
  },
  pages: {
    signIn: "/logins"
  }
})

const handleAuthChceck: Handle = async ({ event, resolve }) => {
  if (event.route.id!.startsWith("/users") && !await event.locals.getSession()) {
    console.log("adsasdasd")
    event.cookies.delete("next-auth.session-token")
    // throw redirect(300, "/")
  }
  const response = resolve(event)
  return response
}

export const handle = sequence(handleTRPCContext, handleAuth, handleAuthChceck)