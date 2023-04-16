import { sequence } from "@sveltejs/kit/hooks";
import { createContext } from "./lib/trpc/context";
import { router } from "./lib/trpc/router"
import type { Handle } from "@sveltejs/kit";
import { createTRPCHandle } from "trpc-sveltekit"
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"

const handleTRPCContext: Handle = createTRPCHandle({
  router: router,
  createContext: createContext,
})

const handleAuth: Handle = SvelteKitAuth

export const handle = sequence(handleTRPCContext)