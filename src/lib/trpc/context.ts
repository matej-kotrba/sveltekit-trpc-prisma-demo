import PrismaClient from "../prisma"
import type { RequestEvent } from "@sveltejs/kit";
import type { inferAsyncReturnType } from "@trpc/server";

export async function createContext(event: RequestEvent) {
  return {
    prisma: PrismaClient
  }
}

export type Context = inferAsyncReturnType<typeof createContext>