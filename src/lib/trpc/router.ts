import { initTRPC } from "@trpc/server";
import { z } from "zod"

export const t = initTRPC.create()

export const router = t.router({
  greeting: t.procedure.input(z.object({
    text: z.string()
  })).query(async ({ input }) => {
    return `To je fakt ${input.text}!`
  })
})

export type Router = typeof router