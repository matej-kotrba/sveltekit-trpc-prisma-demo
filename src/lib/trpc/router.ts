import { initTRPC } from "@trpc/server";
import { z } from "zod"
import type { Context } from "./context";

export const t = initTRPC.context<Context>().create()

export const router = t.router({
  greeting: t.procedure.input(z.object({
    text: z.string()
  })).query(async ({ input, ctx }) => {
    return {
      text: `To je fakt ${input.text}!`,
      user: await ctx.prisma.user.findFirst()
    }
  }),
  addUser: t.procedure.input(z.object({
    name: z.string(),
  })).mutation(async ({ input, ctx }) => {
    return await ctx.prisma.user.create({
      data: {
        name: input.name,
      },
    })
  })
})

export type Router = typeof router