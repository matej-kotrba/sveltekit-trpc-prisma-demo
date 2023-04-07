import { initTRPC } from "@trpc/server";

export const t = initTRPC.create()

export const router = t.router({
  greeting: t.procedure.query(async () => {
    return `To je fakt extrém!`
  })
})

export type Router = typeof router